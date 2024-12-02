"use server";
import { redirect } from "next/navigation";
import { AttendanceFormValues } from "../components/AttendanceFormBuilder";
import { Routes } from "@/lib/routes";
import { AttendanceStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

export const createAttendance = async (values: AttendanceFormValues) => {
  const loginUser = await getLoggedInUser();
  const supabase = await getSupabaseClient();

  const payload = {
    ...values,
    memberId: Number(values.memberId),
  };

  const { error } = await supabase.from(Tables.Attendance).insert({
    ...payload,
    status: AttendanceStatus.Pending,
    role:loginUser.role,
    shift:loginUser.shift
  });

  if (error) {
    return error;
  }

  redirect(Routes.Attendance);
};
