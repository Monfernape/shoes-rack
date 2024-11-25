"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getLeaveRequestById = async (requestId: number) => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from(Tables.Leaves)
    .select(`memberId, leaveType, startDate, endDate, reason, id`)
    .eq("id", requestId)
    .maybeSingle();

  if (error) {
    throw error.message;
  }

  return data;
};
