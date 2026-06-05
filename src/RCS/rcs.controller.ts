import { Body, Controller, Post } from '@nestjs/common';
import { RcsService } from './rcs.service';

@Controller('rcs')
export class RcsController {
  constructor(private readonly rcsService: RcsService) {}

  @Post('send')
  sendRCS() {
    return this.rcsService.sendRCS();
  }

  @Post('dlr')
  handleDlr(@Body() body: unknown) {
    this.rcsService.handleDLR(body);
  }

  @Post('mo')
  handleMo(@Body() body: unknown) {
    this.rcsService.handleMo(body);
  }
}
