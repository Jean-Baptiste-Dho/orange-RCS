import { Controller } from '@nestjs/common';
import { SupabaseClientService } from './supabase-client.service';

@Controller('supabase-client')
export class SupabaseClientController {
  constructor(private readonly supabaseClientService: SupabaseClientService) {}
}
