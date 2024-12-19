'use server'
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAllFunds = async () => {
  const supabase = await getSupabaseClient();
  const { data:funds, error } = await supabase
    .from(Tables.Funds)
    .select(` *, ${Tables.Members} ( *) `);

  console.log("data***", funds);
  if (error) {
    throw error;
  }
  return funds
};
