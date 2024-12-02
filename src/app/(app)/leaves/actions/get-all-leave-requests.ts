"use server";

import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getMembers } from "../../members/actions/getMembers";

export const getAllLeaveRequests = async (query: string | null) => {
  const supabase = await getSupabaseClient();

  const columns = ["reason", "leaveType"];

  const searchQueryConditions = columns.map((col) => {
    return `${col}.ilike.%${query ?? ""}%`;
  });

  const { data: leaves, error } = await supabase
    .from("leaves")
    .select()
    .or(searchQueryConditions.join(","));
  const { data: members } = await getMembers(query);

  if (error) {
    return [];
  }

  const leaveRequestsWithMembers = leaves.map((leaves) => {
    const member = members.find((m) => m.id === leaves.memberId);
    return {
      id: leaves.id,
      requestedBy: member?.name,
      leaveType: leaves.leaveType,
      startDate: leaves.startDate,
      endDate: leaves.endDate,
      status: leaves.status,
      reason: leaves.reason,
    };
  });

  return leaveRequestsWithMembers;
};
