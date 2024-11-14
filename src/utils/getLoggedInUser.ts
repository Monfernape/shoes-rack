"use server"
import { getCookies } from "@/utils/cookiesManager";

export const getLoggedInUser = async () => {
    const loginUserInfo = await getCookies("loginUser");
    return loginUserInfo;
};
