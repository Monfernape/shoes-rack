"use server";
import { Tables } from "@/lib/db";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getNotificationsCount = async () => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const { count, error: countError } = await supabase
    .from(Tables.Notification)
    .select("*", { count: "exact" })
    .eq("member_id", loginUser.id)
    .eq("is_read", false);
  if (countError) {
    throw countError;
  }
  return count;
};
