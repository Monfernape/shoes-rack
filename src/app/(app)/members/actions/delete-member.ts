"use server";
import { UserStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { hasPermission } from "./has-permission";
import { revalidatePath } from "next/cache";
import { Routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export const deleteMember = async (id: number) => {
  const supabase = await getSupabaseClient();
  const permission = await hasPermission();
  if (permission) {
    const { error } = await supabase
      .from(Tables.Members)
      .update({
        status: UserStatus.Deactivated,
      })
      .eq("id", id);
  
    if (error) {
      throw error;
    }

  }
  return;
};
