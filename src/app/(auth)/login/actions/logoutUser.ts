"use server";
import { Routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const logoutUser = async () => {
  const supabse = await getSupabaseClient();

  const { error } = await supabse.auth.signOut();
  if (error) {
    return error.message;
  }
  redirect(Routes.Login);
};
