import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_ENV_MISSING } from '../_utils/constants';
import { Database } from '../_utils/types/database.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseProvider {
  private supabaseClient: SupabaseClient<Database>;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_PUBLIC_KEY');

    if (!url || !key) {
      throw new Error(SUPABASE_ENV_MISSING);
    }

    this.supabaseClient = createClient<Database>(url, key);
  }

  get client(): SupabaseClient<Database> {
    return this.supabaseClient;
  }
}
