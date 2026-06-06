import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { WorkflowModule } from './workflow/workflow.module';
import { SupabaseClientModule } from './supabase-client/supabase-client.module';
import supabaseConfig from './_utils/supabase.config';
import { ConfigModule } from '@nestjs/config';
import { RcsModule } from './rcs/rcs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [supabaseConfig],
    }),
    RcsModule,
    //WorkflowModule,
    SupabaseClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
