import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';

// --- ENUMS ---
export enum RcsBodyType {
  TEXT = 'TEXT',
}

export enum RcsSuggestionType {
  REPLY = 'REPLY',
}

export enum RcsTimeUnit {
  MINUTES = 'MINUTES',
  HOURS = 'HOURS',
  DAYS = 'DAYS',
}

// --- SOUS-DTOS ---

// 1. DTO pour chaque élément du tableau de suggestions
export class SuggestionDto {
  @IsEnum(RcsSuggestionType)
  type: RcsSuggestionType;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  postbackData: string;
}

// 2. DTO pour l'objet body (qui contient le texte et les suggestions)
export class BodyDto {
  @IsEnum(RcsBodyType)
  type: RcsBodyType;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true }) // 💡 Crucial: Valide CHAQUE objet à l'intérieur du tableau
  @Type(() => SuggestionDto)
  suggestions?: SuggestionDto[];
}

// 3. DTO pour la durée de validité
export class ValidityDto {
  @IsNumber()
  amount: number;

  @IsEnum(RcsTimeUnit)
  timeUnit: RcsTimeUnit;
}
