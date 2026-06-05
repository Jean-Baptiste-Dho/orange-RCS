import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { WorkflowRepository } from './workflow.repository';
import { SupabaseProvider } from '../supabase-client/supabase-provider';

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService, WorkflowRepository, SupabaseProvider],
})
export class WorkflowModule {}
