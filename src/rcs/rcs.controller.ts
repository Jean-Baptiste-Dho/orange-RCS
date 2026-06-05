import { Body, Controller, Post } from '@nestjs/common';
import { RcsService } from './rcs.service';
import type { RcsWebhookPayload } from '@smsmode/rcs';

@Controller('rcs')
export class RcsController {
  constructor(private readonly rcsService: RcsService) {}

  @Post('send')
  sendRCS() {
    return this.rcsService.sendRCS();
  }

  @Post('/dlr')
  handleDlr(@Body() body: unknown) {
    this.rcsService.handleDLR(body);
  }

  @Post('mo')
  handleMo(@Body() body: unknown) {
    this.rcsService.handleMo(body);
  }

  // @Post('data')
  // getPostBackData(@Body() rcsBody: RcsWebhookPayload) {
  //   this.rcsService.extractPostBackdataFromPayload(rcsBody);
  // }
}
