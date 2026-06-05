import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/request/create-workflow.dto';
import { WorkflowRepository } from './workflow.repository';
import { RcsService } from '../rcs/rcs.service';
import { CreateRcsDto } from '../rcs/dto/create-rcs.dto';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly rcsService: RcsService,
  ) {}

  async create(createWorkflowDto: CreateWorkflowDto) {
    return await this.workflowRepository.createWorkflow(createWorkflowDto);
  }

  async getWorkflowById(workflowId: number) {
    const workflow = await this.workflowRepository.getWorkflowById(workflowId);

    if (!workflow) {
      throw new NotFoundException(
        `Le workflow avec l'ID ${workflowId} n'existe pas.`,
      );
    }
    return workflow;
  }

  async startWorkflow(workflowId: number, customersPhoneNumber: string[]) {
    const workflow = await this.getWorkflowById(workflowId);

    const rscMessage: CreateRcsDto = workflow.node;

    for (const phoneNumber of customersPhoneNumber) {
      try {
        await this.rcsService.sendRCS(rscMessage, phoneNumber);
        console.log(`[Workflow] RCS envoyé avec succès au ${phoneNumber}`);
      } catch (error) {
        console.error(
          `[Workflow] Échec d'envoi pour le numéro ${phoneNumber}:`,
          error,
        );
      }
    }

    return {
      success: true,
      message: `Workflow démarré pour ${customersPhoneNumber.length} clients.`,
    };
  }
}
