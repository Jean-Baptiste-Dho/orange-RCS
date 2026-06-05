import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { WorkflowRepository } from './workflow.repository';
import { WorkflowDto } from './dto/workflow.dto';

@Injectable()
export class WorkflowService {
  constructor(private readonly workflowRepository: WorkflowRepository) {}
  async create(createWorkflowDto: CreateWorkflowDto) {
    return await this.workflowRepository.createWorkflow(createWorkflowDto);
  }

  answerTreatment(workflow: WorkflowDto) {
    return workflow;
  }
}
