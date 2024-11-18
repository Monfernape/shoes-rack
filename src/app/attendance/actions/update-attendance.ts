"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { AttendanceFormValues } from "../components/AttendanceFormBuilder";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";

interface Attendance extends AttendanceFormValues {
  id: string | string[];
}

export const updateAttendance = async (attendance: Attendance) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from(Tables.Attendance)
    .update(attendance)
    .eq("id", attendance.id);

  if (error) {
    return error;
  }

  redirect(Routes.Attendance);
};
