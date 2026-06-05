import { Module } from '@nestjs/common';
import { RcsService } from './rcs.service';
import { RcsController } from './rcs.controller';
import { EnvironmentConfig } from '../_utils/config/env.config';

@Module({
  controllers: [RcsController],
  providers: [RcsService, EnvironmentConfig],
  imports: [],
})
export class RcsModule {}
