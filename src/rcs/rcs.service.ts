import { Injectable } from '@nestjs/common';
import { SmsmodeRcsClient } from '@smsmode/rcs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RcsService {
  constructor(private readonly configService: ConfigService) {}
  async sendRCS() {
    const client = new SmsmodeRcsClient({
      // apiKey: process.env.API_KEY || '',
      apiKey: this.configService.get<string>('API_KEY') || '',
    });

    const message = await client.send({
      // recipient: { to: process.env.TARGET_PHONE || '' },
      // body: { type: 'TEXT', text: 'Bonjour depuis smsmode RCS !' },
      // callbackUrlStatus: 'https://smsmode-hack-team-7.ngrok.dev/client/dlr',
      recipient: {
        to: '33600000000',
      },
      body: {
        type: 'CAROUSEL',
        contents: [
          {
            title: 'Start engaging with RCS',
            description:
              'Captivate your audience with media-rich messages and action buttons',
            media: {
              fileUrl: 'https://www.smsmode.com/img/card-1-rcs-demo.png',
            },
            suggestions: [
              {
                type: 'OPEN_URL',
                url: 'https://www.smsmode.com/solutions-sms/rcs-messagerie-mobile/#fonctionnalite',
                text: 'Discover RCS',
                webviewSize: 'TALL',
                postbackData: 'open_url',
              },
            ],
          },
          {
            title: 'Get a certified profile',
            description:
              'Gain credibility and trust with a complete and verified profile',
            media: {
              fileUrl:
                'https://www.smsmode.com/img/card-2-rcs-demo-profil-certifie.jpg',
            },
            suggestions: [
              {
                type: 'OPEN_URL',
                url: 'https://www.smsmode.com/solutions-sms/rcs-messagerie-mobile#avantages',
                text: 'Our commitments',
                webviewSize: 'TALL',
                postbackData: 'open_url',
              },
            ],
          },
          {
            title: 'See RCS in action',
            description: 'Take a look at what RCS can do for you',
            media: {
              fileUrl: 'https://www.smsmode.com/vds/Video-RCS-smsmode.mp4',
              thumbnailUrl:
                'https://www.smsmode.com/img/thumbnail-videos-smsmode.png',
            },
          },
        ],
        cardWidth: 'SMALL',
        suggestions: [
          {
            type: 'REPLY',
            text: 'STOP',
            postbackData: 'reply',
          },
          {
            type: 'OPEN_URL',
            url: 'https://www.smsmode.com',
            text: 'Web site',
            webviewSize: 'TALL',
            postbackData: 'open_url',
          },
          {
            type: 'DIAL_PHONE',
            phoneNumber: '3349106463',
            text: 'Call us',
            postbackData: 'dial_phone',
          },
          {
            type: 'SHOW_LOCATION',
            text: 'Visit us',
            label: 'smsmode© office',
            latitude: 43.30307,
            longitude: 5.37224,
            postbackData: 'show_location',
          },
          {
            type: 'REQUEST_LOCATION',
            text: 'Share position',
            postbackData: 'request_location',
          },
          {
            type: 'CREATE_CALENDAR_EVENT',
            text: 'Make an appointment',
            title: 'RCS demo',
            description: 'RCS presentation with smsmode !',
            startTime: '2026-03-01T14:00:00Z',
            endTime: '2026-03-01T16:00:00Z',
            postbackData: 'create_calendar_event',
          },
        ],
      },
      from: 'RcsCustomAgent',
      sentDate: '2026-01-01T00:00:00',
      validity: {
        amount: 10,
        timeUnit: 'MINUTES',
      },
      refClient: 'reference',
      callbackUrlStatus:
        "callbackUrlStatus: 'https://smsmode-hack-team-7.ngrok.dev/client/dlr'",
      callbackUrlMo: 'https://callbackUrlMo.com',
    });

    console.log(message.messageId); // identifiant unique du message
    console.log(message.status.value); // "ENROUTE", "DELIVERED"..
  }
}
