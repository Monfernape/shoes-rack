'use server'
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";

export const deleteNotification = async (id:number) => {
  const supabase = await getSupabaseClient();
  const {error} = await supabase
  .from(Tables.Notification)
  .delete()
  .eq('id', id)


  if (error) {
    throw error;
  }
  redirect(Routes.Notification)
};
