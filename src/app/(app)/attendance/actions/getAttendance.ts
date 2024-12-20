"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getMembers } from "../../members/actions/getMembers";
import { MemberRole, UserStatus } from "@/constant/constant";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { Attendance } from "@/types";

export const getAttendance = async (id: string ) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const response = await getMembers("");

  let query = supabase
    .from(Tables.Attendance)
    .select(`id, memberId, startTime, endTime, status`);

  // Role-based filtering:
  if (loginUser.role === MemberRole.Member) {
    // Members can only see their own attendance
    query = query.eq("memberId", loginUser.id);
  } else if (loginUser.role === MemberRole.ShiftIncharge) {
    // Shift Incharge filters attendance for members in the same active shift
    const activeMember = response.data.some(
      (member) =>
        member.status === UserStatus.Active &&
        member.shift === loginUser.shift &&
        member.id === id
    );

    query = activeMember
      ? query.eq("memberId", id)
      : query.eq("memberId", loginUser.id);
  } else if (loginUser.role === MemberRole.Incharge && id) {
    // Incharge can see attendance of a specific member
    query = query.eq("memberId", id);
  }

  const { data: attendanceData, error } = await query.returns<Attendance[]>();

  if (error || !attendanceData) {
    return [];
  }


  const members = response.data || [];
  const updatedAttendance = attendanceData.map((attendance) => {
    const member = members.find((member) => member.id === attendance.memberId);
    return {
      ...attendance,
      name: member?.name,
      shift: member?.shift,
    };
  });

  return updatedAttendance;
};
