"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { AttendanceStatus } from "@/constant/constant";

type UpdateAttendanceStatusProps = {
  requestId: number;
  status: AttendanceStatus;
};

export const updateAttendanceStatus = async ({ requestId, status }: UpdateAttendanceStatusProps) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from(Tables.Attendance)
    .update({ status })     
    .eq("id", requestId);

  if (error) {
    throw error
  }

  redirect(Routes.Attendance);
};
