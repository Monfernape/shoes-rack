"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAllNotifications = async () => {
  const supabase = await getSupabaseClient();
  const { data: notifications, error } = await supabase
    .from(Tables.Notification)
    .select(`*`);

  if (error) {
    throw error;
  }
  return notifications;
};
