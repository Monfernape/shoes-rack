"use server";

import { LeaveTypes, MemberRole, UserStatus } from "@/constant/constant";
import { LeavesRequestStatus } from "@/types";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getMembers } from "../../members/actions/getMembers";

interface LeaveRequest {
  id: number;
  leaveType: LeaveTypes;
  startDate: string;
  endDate: string;
  status: LeavesRequestStatus;
  reason: string;
  memberId: number;
  members: { name: string };
}

export const getAllLeaveRequests = async (id: number) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();

  let query = supabase
    .from("leaves")
    .select(
      `id, memberId, leaveType, startDate, endDate, status, reason, members(name)`
    );

  if (loginUser.role === MemberRole.Member) {
    query = query.eq("memberId", loginUser.id);
  } else if (loginUser.role === MemberRole.ShiftIncharge) {
    const response = await getMembers("");
    const activeMember = response.data
      .filter(
        (member) =>
          member.status === UserStatus.Active &&
          member.shift === loginUser.shift
      )
      .some((member) => member.id === id);

    query = activeMember
      ? query.eq("memberId", id)
      : query.eq("memberId", loginUser.id);
  } else if (loginUser.role === MemberRole.Incharge && id) {
    query = query.eq("memberId", id);
  }

  const { data: leaves, error } = await query.returns<LeaveRequest[]>();

  if (error) {
    return [];
  }

  return leaves.map((leave) => ({
    id: leave.id,
    leaveType: leave.leaveType,
    startDate: leave.startDate,
    endDate: leave.endDate,
    status: leave.status,
    reason: leave.reason,
    requestedBy: leave.members.name,
    memberId: leave.memberId,
  }));
};
