import { IsNotEmpty } from 'class-validator';

export class WorkflowDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  content: string;
}
