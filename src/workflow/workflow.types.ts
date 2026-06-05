import { Database } from '../_utils/types/database.types';
import { WorkflowLayoutDto } from './dto/workflow-layout.dto';

type SupabaseWorkflow = Database['public']['Tables']['workflow']['Row'];

export type WorkflowEntity = Omit<SupabaseWorkflow, 'content'> & {
  content: WorkflowLayoutDto;
};
