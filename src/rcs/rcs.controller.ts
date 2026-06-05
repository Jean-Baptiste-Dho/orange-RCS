import { Body, Controller, Post } from '@nestjs/common';
import { RcsService } from './rcs.service';
import { CreateRcsDto } from './dto/create-rcs.dto';

@Controller('rcs')
export class RcsController {
  constructor(private readonly rcsService: RcsService) {}

  @Post('send')
  sendRCS(
    @Body('rscMessage') crsMessage: CreateRcsDto,
    @Body('customerTelNumber') customerTelNumber: string,
  ) {
    return this.rcsService.sendRCS(crsMessage, customerTelNumber);
  }

  @Post('/dlr')
  handleDlr(@Body() body: unknown) {
    this.rcsService.handleDLR(body);
  }

  @Post('mo')
  handleMo(@Body() body: unknown) {
    const test = this.rcsService.handleMo(body);
    console.log(test);
  }
}
