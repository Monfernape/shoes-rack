"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const deleteLeaveRequest = async ({
  requestId,
}: {
  requestId: number;
}) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
    .from(Tables.Leaves)
    .delete()
    .eq("id", requestId);

  if (error) {
    throw error.message;
  }
};
