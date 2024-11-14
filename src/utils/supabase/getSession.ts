"use server";
import { Cookies } from "@/constant/constant";
import { cookies } from "next/headers";

export const getSession = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get(Cookies.Session);

  if (session) {
    try {
      const sessionData = JSON.parse(session.value);

      const { access_token, expires_at, refresh_token } = sessionData;

      const expiresAtDate = new Date(expires_at * 1000);
      const currentDate = new Date();

      const isTokenValid =
        currentDate < expiresAtDate && !!refresh_token && !!access_token;

      return isTokenValid;
    } catch (error) {
      console.error("Failed to parse session data:", error);
    }
  } else {
    return false;
  }
};
