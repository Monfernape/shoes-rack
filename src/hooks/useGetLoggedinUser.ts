"use client";
import { getCookies } from "@/utils/cookiesManager";
import { useMemo } from "react";

export const useGetLoggedInUser = () => {
  const loginUser = useMemo(async () => {
    const loginUserInfo = await getCookies("loginUser");
    return loginUserInfo;
  }, []);
  return { loginUser };
};
