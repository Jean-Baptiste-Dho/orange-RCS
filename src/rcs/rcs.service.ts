import { Injectable } from '@nestjs/common';
import {
  isDeliveryReport,
  isIncomingMessage,
  parseWebhookPayload,
  RcsIncomingMessagePayload,
  RcsSuggestionBase,
  RcsWebhookPayload,
  SmsmodeRcsClient,
} from '@smsmode/rcs';
import { ConfigService } from '@nestjs/config';
import { MessageBodyDto, RcsMessageDto } from './dto/response/basic-rcs.dto';

@Injectable()
export class RcsService {
  constructor(private readonly configService: ConfigService) {}
  async sendRCS() {
    const rcsClient = new SmsmodeRcsClient({
      apiKey: this.configService.get<string>('API_KEY') || '',
    });

    const message = await rcsClient.send({
      recipient: { to: process.env.TARGET_PHONE || '' },
      //body: { type: 'TEXT', text: 'Bonjour depuis smsmode RCS !' },
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
            postbackData: 'reply',
          },
          {
            type: 'REPLY',
            text: 'OUI',
            postbackData: 'reply',
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
      console.log('MO reçu :', payload.body.text);
      return this.extractPostBackdataFromPayload(payload);
    }
    return { ok: true };
  }

  private extractPostBackdataFromPayload(rcs: RcsWebhookPayload) {
    const test = rcs.body;
    Object.keys(test).map((value) => console.log(value));
  }
}
