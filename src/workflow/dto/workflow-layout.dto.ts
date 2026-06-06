import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

export class NodeButtonDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  label: string;
}

export class NodeDataDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => NodeButtonDto)
  buttons: NodeButtonDto[];
}

export class NodeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @ValidateNested()
  @Type(() => NodeDataDto)
  data: NodeDataDto;
}

export class EdgeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  target: string;

  @IsString()
  @IsNotEmpty()
  triggerButtonId: string;
}

export class WorkflowLayoutDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NodeDto)
  nodes: NodeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EdgeDto)
  edges: EdgeDto[];
}
