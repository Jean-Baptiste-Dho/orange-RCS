import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { WorkflowRepository } from './workflow.repository';
import { SupabaseProvider } from '../supabase-client/supabase-provider';
import { RcsService } from '../rcs/rcs.service';

@Module({
  controllers: [WorkflowController],
  providers: [
    WorkflowService,
    WorkflowRepository,
    SupabaseProvider,
    RcsService,
  ],
})
export class WorkflowModule {}
