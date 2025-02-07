"use server";
import { Routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { clearCookies } from "@/utils/cookiesManager";
import { Cookies } from "@/constant/constant";

export const logoutUser = async () => {
  const supabse = await getSupabaseClient();

  const { error } = await supabse.auth.signOut();
  if (error) {
    return error.message;
  }
  clearCookies([Cookies.LoginUser,Cookies.Session])
  redirect(Routes.Login);
};
