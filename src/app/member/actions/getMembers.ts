"use server";

import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getMembers = async () => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.from("members").select("*");

  return {
    data: data || [],
    error: error || null,
  };
};
