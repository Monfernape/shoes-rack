"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { AttendanceFormValues } from "../components/AttendanceFormBuilder";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { AttendanceStatus, MemberRole } from "@/constant/constant";
import { User } from "@/types";
import { getUserById } from "../../members/actions/get-user-by-id";

interface Attendance extends AttendanceFormValues {
  id: string;
}

export const updateAttendance = async (
  attendance: Attendance,
  loginUser: User | undefined
) => {
  const supabase = await getSupabaseClient();

  if (
    loginUser?.role === MemberRole.Member &&
    loginUser.id !== Number(attendance.id)
  ) {
    return { error: "You have not permission" };
  }
  if (loginUser?.role === MemberRole.ShiftIncharge) {
    const member = await getUserById(attendance.id);
    if (member.shift !== loginUser.shift) {
      return { error: "You have not permission" };
    }
    if (member.role === loginUser.role) {
      return { error: "You have not permission" };
    }
  }

  const { error } = await supabase
    .from(Tables.Attendance)
    .update(attendance)
    .eq("id", attendance.id)
    .eq("status", AttendanceStatus.Pending);

  if (error) {
    return { error: error.message };
  }

  redirect(Routes.Attendance);
};
