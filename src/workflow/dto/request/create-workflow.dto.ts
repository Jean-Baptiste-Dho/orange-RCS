import { IsNotEmpty } from 'class-validator';

export class CreateWorkflowDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
