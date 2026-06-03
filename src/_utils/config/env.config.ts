import { IsString } from 'class-validator';

export class EnvironmentConfig {
  @IsString()
  API_KEY: string;

  @IsString()
  AUTH_TOKEN: string;

  @IsString()
  TARGET_PHONE: string;
}
