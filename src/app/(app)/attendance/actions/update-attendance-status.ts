"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { AttendanceStatus } from "@/constant/constant";
import { getAccessToUser } from "@/utils/getAccessToUser";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getAttendanceById } from "./getAttendanceById";

type UpdateAttendanceStatusProps = {
  attendanceId: number;
  attendanceStatus: AttendanceStatus;
};

export const updateAttendanceStatus = async ({
  attendanceId,
  attendanceStatus,
}: UpdateAttendanceStatusProps) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const attendance = await getAttendanceById(attendanceId);

  const { role: loggedUserRole, id: loggedUserId } = loginUser;
  const { status, memberId } = attendance;

  const isAccessToUser = getAccessToUser({
    loggedUserId,
    loggedUserRole,
    memberId,
    status,
  });

  if (isAccessToUser) {
    const { error } = await supabase
      .from(Tables.Attendance)
      .update({ status: attendanceStatus })
      .eq("id", attendanceId);

    if (error) {
      throw error;
    }

    redirect(Routes.Attendance);
  }
  return;
};
