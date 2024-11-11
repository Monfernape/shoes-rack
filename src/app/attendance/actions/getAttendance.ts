"use server";

import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";

export const getAttendace = async () => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.from("attendance").select("*");

  if (error) {
    return {
      success: false,
      message: "There are no attendance available at this time.",
      data: [],
    };
  }

  return {
    success: true,
    message: "Attendance loaded successfully.",
    data: data || [],
  };
};
