import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseProvider } from '../supabase-client/supabase-provider';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { WorkflowEntity } from './workflow.entity';

@Injectable()
export class WorkflowRepository {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  async createWorkflow(
    createWorkflowDto: CreateWorkflowDto,
  ): Promise<WorkflowEntity> {
    const { data, error } = await this.supabaseProvider.client
      .from('workflow')
      .insert({
        name: createWorkflowDto.title,
        content: createWorkflowDto.content,
      })
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Erreur lors de la création du workflow : ${error.message}`,
      );
    }
    return data;
  }
}
