"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getFundDetailsById = async (fundId: number) => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from(Tables.Funds)
    .select()
    .eq("id", fundId)
    .maybeSingle();

  if (error) {
    throw error.message;
  }

  return {
    id: data.id,
    createdAt: data.created_at,
    memberId: data.member_id,
    amount: data.amount,
  };
};
