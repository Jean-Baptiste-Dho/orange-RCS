import { PartialType } from '@nestjs/mapped-types';
import { CreateRcsDto } from './create-rcs.dto';

export class UpdateRcsDto extends PartialType(CreateRcsDto) {}
