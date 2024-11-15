"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { AttendanceFormValues } from "../components/AttendanceFormBuilder";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";

export const updateAttendance = async (
  id: number,
  { startTime, endTime, memberId }: AttendanceFormValues
) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from(Tables.Attendance)
    .update({ startTime, endTime, memberId })
    .eq("id", id);

  if (error) {
    return error;
  }

  redirect(Routes.Attendance);
};
