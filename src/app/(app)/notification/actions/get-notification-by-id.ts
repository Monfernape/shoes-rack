"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getNotificationById = async (id: number) => {
  const supabase = await getSupabaseClient();
  const { data: notifications, error } = await supabase
    .from(Tables.Notification)
    .select(`*`)
    .eq("id", id).single();

  if (error) {
    throw error;
  }
  return notifications;
};
