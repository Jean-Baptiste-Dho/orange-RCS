import { Body, Controller, Get, Post } from '@nestjs/common';
import { RcsService } from './rcs.service';
import { MessageBodyDto } from './dto/response/basic-rcs.dto';

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

  @Post('data')
  getPostBackData(@Body() rcsBody: MessageBodyDto) {
    this.rcsService.extractPostBackdataFromPayload(rcsBody: MessageBodyDto);
  }
}
