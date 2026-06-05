import { Module } from '@nestjs/common';
import { SupabaseClientService } from './supabase-client.service';
import { SupabaseClientController } from './supabase-client.controller';

@Module({
  controllers: [SupabaseClientController],
  providers: [SupabaseClientService],
})
export class SupabaseClientModule {}
