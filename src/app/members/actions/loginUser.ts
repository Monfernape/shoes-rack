"use server";
import { Tables } from "@/lib/db";
import { intlNumberFormat } from "@/utils/phoneNumberFormatter";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { Cookies, UserStatus } from "@/constant/constant";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { addCookies } from "@/utils/cookiesManager";

type LoginUser = {
  phoneNumber: string;
  password: string;
};

export const loginUser = async ({ phoneNumber, password }: LoginUser) => {
  const supabase = await getSupabaseClient();
  const phoneNum = intlNumberFormat(phoneNumber);

  const { data: authUserData, error } = await supabase.auth.signInWithPassword({
    phone: phoneNum,
    password: password,
  });

  if (error) {
    throw error;
  } else {
    // in success login case,update status and remove the invited link
    const { data: loginUser, error } = await supabase
      .from(Tables.Members)
      .update({
        status: UserStatus.Active,
        invite_link: "",
      })
      .eq("phoneNumber", phoneNum)
      .select("*")
      .single();

    if (error) {
      throw error;
    } else {
      // getting session
      const { session } = authUserData;

      // addCookies function get name and values that will store against name
      addCookies({
        name: Cookies.LoginUser,
        values: loginUser,
      });

      addCookies({
        name: Cookies.Session,
        values: session,
      });

      redirect(Routes.Dashboard);
    }
  }
};
