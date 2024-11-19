
"use server"
import { Routes } from "@/lib/routes";
import { clearCookies } from "@/utils/cookiesManager";
import { redirect } from "next/navigation";
import { Cookies } from "@/constant/constant";

export const logoutUser = async () => {
  clearCookies([Cookies.LoginUser, Cookies.Session]);
  redirect(Routes.Login);
};
