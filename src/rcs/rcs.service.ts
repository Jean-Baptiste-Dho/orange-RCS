import { Injectable } from '@nestjs/common';
import {
  isDeliveryReport,
  isIncomingMessage,
  parseWebhookPayload,
  RcsMessage,
  SmsmodeRcsClient,
} from '@smsmode/rcs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RcsService {
  constructor(private readonly configService: ConfigService) {}
  async sendRCS() {
    const rcsClient = new SmsmodeRcsClient({
      apiKey: this.configService.get<string>('API_KEY') || '',
    });
    // const validatedTelFormat = this.checkTelFormat(clientTel);
    const validatedTelFormat = '+33601105588';
    const message = await rcsClient.send({
      recipient: { to: validatedTelFormat },
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
      validity: {
        amount: 15,
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

  handleMo(body: unknown) {
    const payload = parseWebhookPayload(body);
    if (isIncomingMessage(payload)) {
      // console.log('MO reçu :', payload.body.text);
      return payload.body.text;
    }
    // return { ok: true };
  }

  private checkTelFormat(clientTel: string): string {
    if (!clientTel.includes('+33') && clientTel.length !== 12) {
      throw new Error('Tel format is incorrect');
    }
    return clientTel;
  }
}
