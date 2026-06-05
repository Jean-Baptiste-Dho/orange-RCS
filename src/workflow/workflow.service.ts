import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { WorkflowRepository } from './workflow.repository';

@Injectable()
export class WorkflowService {
  constructor(private readonly workflowRepository: WorkflowRepository) {}
  async create(createWorkflowDto: CreateWorkflowDto) {
    return await this.workflowRepository.createWorkflow(createWorkflowDto);
  }

  async answerTreatment() {}
}
