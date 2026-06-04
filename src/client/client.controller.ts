import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { isDeliveryReport, parseWebhookPayload } from '@smsmode/rcs';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

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
}
