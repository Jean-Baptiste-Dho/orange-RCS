import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseProvider } from '../supabase-client/supabase-provider';
import { CreateWorkflowDto } from './dto/request/create-workflow.dto';
import { WorkflowTypes } from './workflow.types';

@Injectable()
export class WorkflowRepository {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  async createWorkflow(
    createWorkflowDto: CreateWorkflowDto,
  ): Promise<WorkflowTypes> {
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

  async getWorkflowById(workflowId: number): Promise<WorkflowTypes | null> {
    const { data, error } = await this.supabaseProvider.client
      .from('workflow')
      .select()
      .eq('id', workflowId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        `Erreur lors de la récupération du workflow : ${error.message}`,
      );
    }

    return data;
  }

  // workflow.repository.ts

  async saveSession(phone: string, workflowId: number, nodeId: string) {
    await this.supabaseProvider.client.from('rcs_session').upsert({
      phone_number: phone,
      workflow_id: workflowId,
      current_node_id: nodeId,
    });
  }

  async getSession(phone: string) {
    const { data } = await this.supabaseProvider.client
      .from('rcs_session')
      .select()
      .eq('phone_number', phone)
      .maybeSingle();
    return data;
  }

  async deleteSession(phone: string) {
    await this.supabaseProvider.client
      .from('rcs_session')
      .delete()
      .eq('phone_number', phone);
  }
}
