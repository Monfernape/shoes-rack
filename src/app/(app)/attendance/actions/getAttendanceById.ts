"use server";

import { Tables } from "@/lib/db";
import { AttendanceResponse, MemberDetails } from "@/types";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAttendanceById = async (id: number): Promise<MemberDetails> => {
  const supabase = await getSupabaseClient();

  const { data: attendance, error } = await supabase
    .from(Tables.Attendance)
    .select(
      `
      id,
      memberId,
      startTime,
      endTime,
      status,
      member:memberId (
        name,
        shift
      )
    `
    )
    .eq("id", id)
    .single<AttendanceResponse>();

  if (error) {
    throw error;
  }

  const attendanceDetails = {
    id: attendance.id,
    memberId: attendance.memberId,
    startTime: attendance.startTime,
    endTime: attendance.endTime,
    status: attendance.status,
    name: attendance.member.name,
    shift: attendance.member.shift,
  };

  return attendanceDetails;
};


