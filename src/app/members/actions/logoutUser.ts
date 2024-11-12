import { Routes } from "@/lib/routes";
import { clearCookies } from "@/utils/cookiesManager";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
  clearCookies(["loginUser", "session"]);
  redirect(Routes.Login);
};
