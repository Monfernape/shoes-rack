import moment from "moment";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getleaves = async () => {
  const supabase = await getSupabaseClient();

  // Get the current month's start and end dates using moment
  const startOfMonth = moment().startOf('month').toISOString();
  const endOfMonth = moment().endOf('month').toISOString();

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

