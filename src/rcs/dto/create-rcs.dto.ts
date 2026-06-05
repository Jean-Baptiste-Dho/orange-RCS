import { Type } from 'class-transformer'; // 💡 Obligatoire pour le ValidateNested
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';

enum RcsTypeEnum {
  BASIC = 'BASIC',
  TEXT = 'TEXT',
  CARD = 'CARD',
  CAROUSEL = 'CAROUSEL',
  FILE = 'FILE',
}

export class SuggestionsDto {
  @IsString()
  type: string;

  @IsString()
  text: string;

  @IsString()
  postbackData: string;
}

export class CreateRcsDto {
  @IsEnum(RcsTypeEnum)
  type: RcsTypeEnum;

  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SuggestionsDto)
  suggestions: SuggestionsDto[];
}
