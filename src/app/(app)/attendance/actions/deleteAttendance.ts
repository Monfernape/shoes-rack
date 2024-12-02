"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const deleteAttendance = async (id: number) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from(Tables.Attendance)
    .delete()
    .eq("id", id);

  if (error) {
    return error;
  }
};
