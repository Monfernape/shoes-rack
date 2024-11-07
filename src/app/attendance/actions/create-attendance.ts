"use server";
import { AttendanceStatus, Table } from "@/types/index";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { AttendanceFormValues } from "../components/AttendanceFormBuilder";

export const createAttendance = async (values: AttendanceFormValues) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(Table.Attendance).insert({
    ...values,
    status: AttendanceStatus.Pending,
  });

  if (error) {
    return error;
  }

  redirect(Routes.Attendance);
};
