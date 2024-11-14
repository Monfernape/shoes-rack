"use server"
import { Cookies } from "@/constant/constant";
import { getCookies } from "@/utils/cookiesManager";

export const getLoggedInUser = async () => {
    const loginUserInfo = await getCookies(Cookies.LoginUser);
    return loginUserInfo;
};
