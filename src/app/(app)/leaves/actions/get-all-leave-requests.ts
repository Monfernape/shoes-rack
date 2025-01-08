"use server";

import { LeaveTypes, MemberRole, UserStatus } from "@/constant/constant";
import { LeavesRequestStatus, Member, User } from "@/types";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getMembers } from "../../members/actions/getMembers";
import { Tables } from "@/lib/db";

interface LeaveRequest {
  id: number;
  leaveType: LeaveTypes;
  startDate: string;
  endDate: string;
  status: LeavesRequestStatus;
  reason: string;
  memberId: number;
  members: { name: string; status: UserStatus };
}

export const getAllLeaveRequests = async (id: number) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const response = await getMembers("");

  let query = supabase
    .from(Tables.Leaves)
    .select(
      `id, memberId, leaveType, startDate, endDate, status, reason, members(name , status)`
    ).eq('members.status', 'active');

  // Handle role-based filtering:
  if (loginUser.role === MemberRole.Member) {
    // If the logged-in user is a Member, only fetch their own leave requests
    query = query.eq("memberId", loginUser.id);
  } else if (loginUser.role === MemberRole.ShiftIncharge) {
    // If the logged-in user is a Shift Incharge, fetch leave requests for active members in the same shift
    const activeMember = response.data
      .filter(
        (member) =>
          member.status === UserStatus.Active &&
          member.shift === loginUser.shift
      )
      .some((member) => member.id === id);

    // If the member is part of the active shift, fetch their leave requests; otherwise, fetch for the logged-in user
    query = activeMember
      ? query.eq("memberId", id)
      : query.eq("memberId", loginUser.id);
  } else if (loginUser.role === MemberRole.Incharge && id) {
    // If the logged-in user is an Incharge and an ID is provided, fetch leave requests for that member
    query = query.eq("memberId", id);
  }

  const { data: leaves, error } = await query.returns<LeaveRequest[]>();

  if (error) {
    return [];
  }
  const filterLeaves =  leaves.filter((leave) => leave.members !== null)
  return filterLeaves.map((leave) => ({
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
