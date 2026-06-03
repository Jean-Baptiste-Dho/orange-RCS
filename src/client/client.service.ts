import { Injectable } from '@nestjs/common';
import { SmsmodeRcsClient } from '@smsmode/rcs';
import { EnvironmentConfig } from '../_utils/config/env.config';

@Injectable()
export class ClientService {
  constructor(private readonly envConfig: EnvironmentConfig) {}
  async sendRCS() {
    const client = new SmsmodeRcsClient({
      apiKey: 'IAqWNeZSfiD33EmTDnmQdOCOVGgleCau',
    });

    const message = await client.send({
      recipient: { to: '+33601105588' },
      body: { type: 'TEXT', text: 'Bonjour depuis smsmode RCS !' },
    });

    console.log(message.messageId); // identifiant unique du message
    console.log(message.status.value); // "ENROUTE", "DELIVERED"..
  }
}
