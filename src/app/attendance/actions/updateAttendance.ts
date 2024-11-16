"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { AttendanceFormValues } from "../components/AttendanceFormBuilder";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";

type Attendance = {
  attendanceId: number;
  value: AttendanceFormValues;
}
export const updateAttendance = async (
values : Attendance
) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from(Tables.Attendance)
    .update(values)
    .eq("id", values.attendanceId);

  if (error) {
    return error;
  }

  redirect(Routes.Attendance);
};
