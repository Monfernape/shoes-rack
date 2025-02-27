"use server";
import { Tables } from "@/lib/db";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAllNotifications = async () => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const { data: notifications, error } = await supabase
    .from(Tables.Notification)
    .select(`*`)
    .eq("member_id", loginUser.id);

  if (error) {
    throw error;
  }
  return notifications;
};
