/*
import { Controller, Post, Body, Param } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/request/create-workflow.dto';

@Controller('workflow')
export class WorkflowController {
constructor(private readonly workflowService: WorkflowService) {}

@Post('create')
createWorkflow(@Body() createWorkflowDto: CreateWorkflowDto) {
  return this.workflowService.create(createWorkflowDto);
}

@Post(':workflowId/start')
startWorkflow(
  @Param('workflowId') workflowId: number,
  @Body() customerPhonenumber: string[],
) {
  return this.workflowService.startWorkflow(workflowId, customerPhonenumber);
}
}
 */
