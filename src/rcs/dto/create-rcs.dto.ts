import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { SuggestionDto } from './requests/create-rcs.dto';

enum RcsTypeEnum {
  BASIC = 'basic',
  TEXT = 'text',
  CARD = 'card',
  CAROUSEL = 'carousel',
  FILE = 'file',
}

export class CreateRcsDto {
  @IsEnum(RcsTypeEnum)
  enumType: RcsTypeEnum;

  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  suggestions: SuggestionDto[];
}

export class SuggestionsDto {
  @IsString()
  type: string;

  @IsString()
  text: string;

  @IsString()
  postbackData: string;
}
