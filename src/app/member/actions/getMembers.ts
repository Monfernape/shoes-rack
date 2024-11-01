"use server";

import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getMembers = async () => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.from("members").select("*");

  if (error) {
    return {
      success: false,
      message:"There are no members available at this time.",
      data: [],
    };
  }
  
  return {
    success: true,
    message:'Members loaded successfully.',
    data: data || [],
  };
};
