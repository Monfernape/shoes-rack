"use server";
import { getSupabaseClient } from "../../../utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import { AttendanceFormValues } from "../components/AttendanceFormBuilder";
import { AttendanceStatus, Table } from "@/constant/constant";
import { Routes } from "@/lib/routes";

export const createAttendance = async (values: AttendanceFormValues) => {
  const supabase = await getSupabaseClient();

  const payload = {
    ...values,
    memberId: Number(values.memberId),
  };

  const { error } = await supabase.from(Table.Attendance).insert({
    ...payload,
    status: AttendanceStatus.Pending,
  });

  if (error) {
    return error;
  }

  redirect(Routes.Attendance);
};
