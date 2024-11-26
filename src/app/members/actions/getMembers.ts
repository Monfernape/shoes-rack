"use server";

import { UserStatus } from "@/constant/constant";
import { getSupabaseClient } from "../../../utils/supabase/supabaseClient";
import { Tables } from "@/lib/db";

export const getMembers = async () => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from(Tables.Members)
    .select("*")
    .neq("status", UserStatus.Deactivated);

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
    data: data || [],
  };
};
