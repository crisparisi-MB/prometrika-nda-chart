import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type IndicationCategory = {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
};

export type Indication = {
  id: string;
  category_id: string;
  name: string;
  has_iss: boolean;
  has_ise: string;
  has_clinical_summaries: string;
  display_order: number;
  created_at: string;
  footnote?: string;
  has_regulatory_meeting_attendance?: string;
};
