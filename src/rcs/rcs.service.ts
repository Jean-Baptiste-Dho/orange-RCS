import { Injectable } from '@nestjs/common';
import {
  isDeliveryReport,
  isIncomingMessage,
  parseWebhookPayload,
  SmsmodeRcsClient,
} from '@smsmode/rcs';
import { ConfigService } from '@nestjs/config';
import { CreateRcsDto } from './dto/create-rcs.dto';

@Injectable()
export class RcsService {
  constructor(private readonly configService: ConfigService) {}

  async sendRCS(createRCSDto: CreateRcsDto, customerTelNumber: string) {
    const rcsClient = new SmsmodeRcsClient({
      apiKey: this.configService.get<string>('API_KEY') || '',
    });

    const suggestionsArray = createRCSDto.suggestions.map((suggestion) => ({
      type: suggestion.type as 'REPLY',
      text: suggestion.text,
      postbackData: suggestion.postbackData,
    }));
    const validatedTelFormat = this.checkTelFormat(customerTelNumber);
    const message = await rcsClient.send({
      recipient: { to: validatedTelFormat },
      /*
        body: {
          type: 'TEXT',
          text:
            'Welcome to the world of RCS ! 🎉' +
            '\n\nDiscover the new channel that is transforming customer communication.' +
            '\n\nChat without size limits, 𝘢𝘥𝘥 𝘴𝘵𝘺𝘭𝘦 to 𝘆𝗼𝘂𝗿 𝘁𝗲𝘅𝘁.' +
            '\n\nAttach rich media and communicate from a verified brand profile.' +
            '\n\nThe future of mobile marketing is here 🚀',
          suggestions: [
            {
              type: 'REPLY',
              text: 'STOP',
              postbackData: 'stop',
            },
            {
              type: 'REPLY',
              text: 'OUI',
              postbackData: 'oui',
            },
          ],
        },
         */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: {
        type: createRCSDto.type,
        text: createRCSDto.text,
        suggestions: suggestionsArray,
      } as any,
      validity: {
        amount: 1440,
        timeUnit: 'MINUTES',
      },
      callbackUrlStatus: 'https://smsmode-hack-team-7.ngrok.dev/rcs/dlr',
      callbackUrlMo: 'https://smsmode-hack-team-7.ngrok.dev/rcs/mo',
    });

    console.log(message.messageId); // identifiant unique du message
    console.log(message.status.value); // "ENROUTE", "DELIVERED"..
  }

  handleDLR(body: unknown) {
    const payload = parseWebhookPayload(body);
    if (isDeliveryReport(payload)) {
      console.log(
        'DLR reçu :',
        'messageId:',
        payload.messageId,
        'status:',
        payload.status.value,
      );
    }
    return { ok: true };
  }

  /*handleMo(body: unknown) {
    const payload = parseWebhookPayload(body);
    if (isIncomingMessage(payload)) {
      return payload.body.text;
    }
  }
   */

  async handleMo(body: unknown) {
    const payload = parseWebhookPayload(body);
    //console.log('payload complet:', JSON.stringify(payload));
    if (!isIncomingMessage(payload)) return;

    const postbackData = (payload.body as any).postbackData;
    const customerTel = '+' + payload.recipient.to;

    await this.sendDecisionMessage(postbackData, customerTel);
  }

  private async sendDecisionMessage(postbackData: string, customerTel: string) {
    const rcsClient = new SmsmodeRcsClient({
      apiKey: this.configService.get<string>('API_KEY') || '',
    });

    const messages: Record<string, any> = {
      // Niveau 2 — réponse à "Oui, je veux une option voyage"
      user_optin_yes: {
        type: 'TEXT',
        text: 'Super ! Voici les deux options les mieux adaptées pour votre séjour à Barcelone',
        suggestions: [
          {
            type: 'REPLY',
            text: 'Pass Voyage Léger',
            postbackData: 'pass_leger',
          },
          {
            type: 'REPLY',
            text: 'Pass Voyage Intense',
            postbackData: 'pass_intense',
          },
        ],
      },

      // Niveau 2 — réponse à "Non merci"
      user_optin_no: {
        type: 'TEXT',
        text: "Pas de problème ! Si vous changez d'idée, n'hésitez pas à visiter le site d'Orange. Bon voyage !",
        suggestions: [],
      },

      // Niveau 3 — Pass Voyage Léger
      pass_leger: {
        type: 'TEXT',
        text: "Vous disposez de\n5Go de données + 30 min d'appels\n7 jours à 15€",
        suggestions: [
          { type: 'REPLY', text: 'Choisir', postbackData: 'confirm_choice' },
        ],
      },

      // Niveau 3 — Pass Voyage Intense
      pass_intense: {
        type: 'TEXT',
        text: 'Vous disposez de\n20Go de données + Appels illimités\n14 jours — 29€',
        suggestions: [
          { type: 'REPLY', text: 'Choisir', postbackData: 'confirm_choice' },
        ],
      },

      // Niveau 4 — Confirmation finale
      confirm_choice: {
        type: 'TEXT',
        text: 'Super, votre choix a été enregistré ! Vous allez recevoir un mail de confirmation dans quelques minutes.',
        suggestions: [],
      },
    };

    const messageBody = messages[postbackData];
    if (!messageBody) return; // postbackData inconnu, on ignore

    await rcsClient.send({
      recipient: { to: customerTel },
      body: messageBody,
      validity: { amount: 1440, timeUnit: 'MINUTES' },
      callbackUrlStatus: 'https://smsmode-hack-team-7.ngrok.dev/rcs/dlr',
      callbackUrlMo: 'https://smsmode-hack-team-7.ngrok.dev/rcs/mo',
    });
  }

  private checkTelFormat(clientTel: string): string {
    if (!clientTel.includes('+33') && clientTel.length !== 12) {
      throw new Error('Tel format is incorrect');
    }
    return clientTel;
  }
}
