"use server";

import { Tables } from "@/lib/db";
import { MemberRole, UserStatus } from "@/constant/constant";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

export const getMembers = async (
  query: string | null,
  status: UserStatus = UserStatus.Active
) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const columns = ["name"];
  const orConditions = columns.map((col) => {
    return `${col}.ilike.%${query ?? ""}%`;
  });

  const queryBuilder = supabase
    .from(Tables.Members)
    .select()
    .or(orConditions.join(","));
  const handleMembers = async () => {
    if (
      loginUser.role === MemberRole.ShiftIncharge &&
      status === UserStatus.Deactivated
    ) {
      return await queryBuilder
        .eq("shift", loginUser.shift)
        .eq("status", status);
    }

    if (
      status === UserStatus.Deactivated &&
      loginUser.role === MemberRole.Incharge
    ) {
      return queryBuilder.eq("status", status);
    }

    return queryBuilder.neq("status", UserStatus.Deactivated);
  };

  const members = await handleMembers();

  if (members.error) {
    return {
      success: false,
      message: members.error.message,
      data: [],
    };
  }

  return {
    success: true,
    message: "Members loaded successfully.",
    data: members.data || [],
  };
};
