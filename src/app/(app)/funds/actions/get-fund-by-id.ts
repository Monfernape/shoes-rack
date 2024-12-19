"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getFundDetailsById = async (fundId: number) => {
  const supabase = await getSupabaseClient();
  const { data : fundDetails, error } = await supabase
    .from(Tables.Funds)
    .select()
    .eq("id", fundId)
    .single();

  if (error) {
    throw error.message;
  }

  return {
    id: fundDetails.id,
    createdAt: fundDetails.created_at,
    memberId: fundDetails.member_id,
    amount: fundDetails.amount,
  };
};
