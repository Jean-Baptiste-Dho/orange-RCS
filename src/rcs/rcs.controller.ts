import { Body, Controller, Post } from '@nestjs/common';
import { RcsService } from './rcs.service';
import {
  isDeliveryReport,
  isIncomingMessage,
  parseWebhookPayload,
} from '@smsmode/rcs';

@Controller('client')
export class RcsController {
  constructor(private readonly clientService: RcsService) {}

  //Route d'envoi
  @Post('send')
  testRCS() {
    return this.clientService.sendRCS();
  }

  // Route de réception des DLR
  @Post('dlr')
  handleDlr(@Body() body: unknown) {
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

  // Route de réception de MO
  @Post('mo')
  handleMo(@Body() body: unknown) {
    const payload = parseWebhookPayload(body);
    if (isIncomingMessage(payload)) {
      console.log('MO reçu :', payload.body.text);
    }
    return { ok: true };
  }
}
