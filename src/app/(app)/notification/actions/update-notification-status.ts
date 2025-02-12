"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const updateNotificationStatus = async (id: number) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
    .from(Tables.Notification)
    .update({ is_read: true })
    .eq("id", id);

  if (error) {
    throw error;
  }
};
