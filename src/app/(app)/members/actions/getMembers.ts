"use server";

import { Tables } from "@/lib/db";
import { UserStatus } from "@/constant/constant";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getMembers = async (
  query: string | null,
  status: UserStatus = UserStatus.Active
) => {
  const supabase = await getSupabaseClient();
  const columns = ["name"];

  let result;
  const filterQuery = columns.map((col) => {
    return `${col}.ilike.%${query ?? ""}%`;
  });

  const queryBuilder = supabase
    .from(Tables.Members)
    .select()
    .or(filterQuery.join(","));

  if (status === UserStatus.Deactivated) {
    result = await queryBuilder.eq("status", status);
  } else {
    result = await queryBuilder.neq("status", UserStatus.Deactivated);
  }

  if (result.error) {
    return {
      success: false,
      message: result.error.message,
      data: [],
    };
  }

  return {
    success: true,
    message: "Members loaded successfully.",
    data: result.data || [],
  };
};
