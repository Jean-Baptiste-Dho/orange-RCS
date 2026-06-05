import { Controller, Post, Body } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { WorkflowDto } from './dto/workflow.dto';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post('/create')
  createWorkflow(@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowService.create(createWorkflowDto);
  }

  @Post()
  manageCallback(workflow: WorkflowDto) {
    return this.workflowService.answerTreatment(workflow);
  }
}
