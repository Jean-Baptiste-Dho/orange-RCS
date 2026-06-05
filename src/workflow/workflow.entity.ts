import { Database, Json } from '../_utils/types/database.types';

type SupabaseWorkflow = Database['public']['Tables']['workflow']['Row'];

export class WorkflowEntity implements SupabaseWorkflow {
  id: number;
  name: string;
  content: Json;
  created_at: string;
  updated_at: string | null;
}
