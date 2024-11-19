"use server";
import { UserStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { hasPermission } from "./has-permission";

export const deleteMember = async (id: number) => {
  const supabase = await getSupabaseClient();
  const permission = await hasPermission();
  if (permission) {
    const response = await supabase
      .from(Tables.Members)
      .update({
        status: UserStatus.Deactivate,
      })
      .eq("id", id);
    return response;
  }
  return;
};
