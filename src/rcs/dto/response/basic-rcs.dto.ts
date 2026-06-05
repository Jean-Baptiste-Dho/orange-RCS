import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class ChannelDto {
  @IsUUID()
  channelId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  type: string;

  @IsString()
  flow: string;
}

export class RecipientDto {
  @IsString()
  @IsNotEmpty()
  to: string;
}

export class MessageBodyDto {
  @IsString()
  type: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  postbackData?: string;
}
