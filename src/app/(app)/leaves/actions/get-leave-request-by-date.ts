import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getleaves = async () => {
  const supabase = await getSupabaseClient();

  // Get the current month's start and end dates
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();

  const { data, error } = await supabase
    .from(Tables.Leaves)
    .select()
    .gte("created_at", startOfMonth)
    .lte("created_at", endOfMonth);

  if (error) {
    throw error.message;
  }

  return data;
};
