"use server";

import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getMembers = async () => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.from("members").select("*");

  if (error) {
    return {
      success: false,
      data: [],
    };
  }

  return {
    success: true,
    data: data || [],
  };
};
