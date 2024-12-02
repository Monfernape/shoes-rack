"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAttendanceById = async (id: number) => {
  const supabase = await getSupabaseClient();

  const { data } = await supabase
    .from(Tables.Attendance)
    .select("*")
    .eq("id", id)
    .single();

  return {
    data: data,
  };
};
