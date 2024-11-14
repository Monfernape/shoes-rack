"use client";
import { Cookies } from "@/constant/constant";
import { getCookies } from "@/utils/cookiesManager";
import { useMemo } from "react";

export const useGetLoggedInUser = () => {
  const loginUser = useMemo(async () => {
    const loginUserInfo = await getCookies(Cookies.LoginUser);
    return loginUserInfo;
  }, []);
  return { loginUser };
};
