"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const deleteMember = async (id: number) => {
  const supabase = await getSupabaseClient();
  const response = await supabase.from(Tables.Members).delete().eq("id", id);
  return response;
};
