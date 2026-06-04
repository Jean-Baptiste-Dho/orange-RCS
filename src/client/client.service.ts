import { Injectable } from '@nestjs/common';
import { SmsmodeRcsClient } from '@smsmode/rcs';
import { EnvironmentConfig } from '../_utils/config/env.config';

@Injectable()
export class ClientService {
  constructor(private readonly envConfig: EnvironmentConfig) {}
  async sendRCS() {
    //console.log('API_KEY : ', process.env.API_KEY);
    const client = new SmsmodeRcsClient({
      apiKey: process.env.API_KEY || '',
    });

    const message = await client.send({
      recipient: { to: process.env.TARGET_PHONE || '' },
      body: { type: 'TEXT', text: 'Bonjour depuis smsmode RCS !' },
      callbackUrlStatus: 'https://smsmode-hack-team-7.ngrok.dev/client/dlr',
    });

    console.log(message.messageId); // identifiant unique du message
    console.log(message.status.value); // "ENROUTE", "DELIVERED"..
  }
}
