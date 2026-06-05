import { Controller, Post, Body } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  createWorkflow(@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowService.create(createWorkflowDto);
  }

  @Post()
  responseFromcallBack() {
    return this.workflowService.answerTreatment();
  }
}
