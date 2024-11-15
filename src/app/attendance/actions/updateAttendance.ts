"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { AttendanceFormValues } from "../components/AttendanceFormBuilder";

export const updateAttendance = async (
  id: number,
  { startTime, endTime, memberId }: AttendanceFormValues
) => {
  try {
    const supabase = await getSupabaseClient();

    const { data, error } = await supabase
      .from(Tables.Attendance)
      .update({ startTime, endTime, memberId })
      .eq("id", id);

    if (error) {
      return error
    }

    return { data };
  } catch (err) {
    console.error("Error updating attendance:", err);
  }
};
