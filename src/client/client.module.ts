import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { EnvironmentConfig } from '../_utils/config/env.config';

@Module({
  controllers: [ClientController],
  providers: [ClientService, EnvironmentConfig],
  imports: [],
})
export class ClientModule {}
