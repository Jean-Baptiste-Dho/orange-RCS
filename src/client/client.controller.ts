import { Controller, Post, Body } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  testRCS() {
    return this.clientService.sendRCS();
  }
}
