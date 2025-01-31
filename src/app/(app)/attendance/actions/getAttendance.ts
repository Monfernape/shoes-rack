"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getMembers } from "../../members/actions/getMembers";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { Attendance } from "@/types";

interface AttendanceType extends Attendance {
  members: { name: string; status: UserStatus; shift: Shift };
}

export const getAttendance = async (id: string) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const response = await getMembers("");

  let query = supabase
    .from(Tables.Attendance)
    .select(
      `id, memberId, startTime, endTime, status , created_at,  ${Tables.Members}(name,status,shift))`
    )
    .eq("members.status", UserStatus.Active);

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
        member.role === loginUser.Member
    );
    query = activeMember
      ? query.eq("memberId", Number(id))
      : query.eq("memberId", Number(loginUser.id));
  } else if (loginUser.role === MemberRole.Incharge && id) {
    // Incharge can see attendance of a specific member
    query = query.eq("memberId", Number(id));
  }
  const { data: attendanceData, error } = await query.returns<
    AttendanceType[]
  >();
  if (error) {
    return [];
  }

  const filterAttendance = attendanceData.filter(
    (attendance) => attendance.members !== null
  );

  return filterAttendance.map((attendance) => ({
    member: attendance.memberId.toString(),
    id: attendance.id,
    startTime: attendance.startTime,
    endTime: attendance.endTime,
    status: attendance.status,
    created_at: attendance.created_at,
    memberId: attendance.memberId,
    name: attendance.members?.name,
    shift: attendance.members?.shift,
  }));
};
