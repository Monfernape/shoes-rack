"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { leaveRequestSchema } from "../add/components/LeaveRequestFormBuilder";
import { z } from "zod";
import { LeaveRequestStatus, MemberRole } from "@/constant/constant";
import { Routes } from "@/lib/routes";
import { getUserById } from "../../members/actions/get-user-by-id";
import { User } from "@/types";
import { redirect } from "next/navigation";

export const updateLeaveRequest = async (
  requestId: number,
  values: z.infer<typeof leaveRequestSchema>,
  loginUser: User | undefined
) => {
  const supabase = await getSupabaseClient();

  if (
    loginUser?.role === MemberRole.Member &&
    loginUser.id !== Number(values.memberId)
  ) {
    return { error: "You have not permission" };
  }
  if (loginUser?.role === MemberRole.ShiftIncharge) {
    const member = await getUserById(String(requestId));

    if (member.shift !== loginUser.shift) {
      return { error: "You have not permission" };
    }
    if (member.role === loginUser.role) {
      return { error: "You have not permission" };
    }
  }

  const { error } = await supabase
    .from(Tables.Leaves)
    .update({
      memberId: Number(values.memberId),
      leaveType: values.leaveType,
      startDate: values.date.from.toISOString(),
      endDate: values.date.to
        ? values.date.to.toISOString()
        : values.date.from.toISOString(),
      reason: values.reason,
      status: LeaveRequestStatus.Pending,
    })
    .eq("id", requestId);

  if (error) {
    return { error: error.message };
  } else {
    redirect(Routes.LeaveRequest);
  }
};
