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

  let queryBuilder = supabase
    .from(Tables.Members)
    .select()
    .or(orConditions.join(","))
    .eq("status", status);

  if (
    loginUser.role === MemberRole.ShiftIncharge &&
    status === UserStatus.Deactivated
  ) {
    const { data: members, error } = await queryBuilder.eq(
      "shift",
      loginUser.shift
    );
    if (error) {
      return {
   
        message: error.message,
        data: [],
      };
    }
    return {

      message: "Members loaded successfully.",
      data: members || [],
    };
  }

  const { data: members, error } = await queryBuilder;
  if (error) {
    return {
      success: false,
      message: "There are no members available at this time.",
      data: [],
    };
  }

  return {
    success: true,
    message: "Members loaded successfully.",
    data: members || [],
  };
};
