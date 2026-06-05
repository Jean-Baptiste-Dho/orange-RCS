import { Module } from '@nestjs/common';
import { RcsService } from './rcs.service';
import { EnvironmentConfig } from '../_utils/config/env.config';
import { RcsController } from './rcs.controller';

@Module({
  controllers: [RcsController],
  providers: [RcsService, EnvironmentConfig],
  imports: [],
})
export class RcsModule {}
