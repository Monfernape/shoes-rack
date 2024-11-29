"use server";
import { getMembers } from "@/app/members/actions/getMembers";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAllLeaveRequests = async (query: string | null) => {
  const supabase = await getSupabaseClient();

  const columns = ["reason", "leaveType"];

  const orConditions = columns.map((col) => {
    return `${col}.ilike.%${query ?? ""}%`;
  });

  const { data: leaves, error } = await supabase
    .from("leaves")
    .select()
    .or(orConditions.join(","));
  const { data: members } = await getMembers(query);

  if (error) {
    return [];
  }

  const enrichedData = leaves.map((leaves) => {
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

  return enrichedData;
};
