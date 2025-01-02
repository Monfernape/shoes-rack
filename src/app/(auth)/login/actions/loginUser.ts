"use server";
import { Tables } from "@/lib/db";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { Cookies, UserStatus } from "@/constant/constant";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { addCookies } from "@/utils/cookiesManager";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";

type LoginUser = {
  phoneNumber: string;
  password: string;
};

export const loginUser = async ({ phoneNumber, password }: LoginUser) => {
  const supabase = await getSupabaseClient();
  const formattedPhoneNumber = intlNumberFormat(phoneNumber);

  try {
    const { data: authUserData } = await supabase.auth.signInWithPassword({
      phone: formattedPhoneNumber,
      password: password,
    });
    // Getting session
    const { session } = authUserData;

    addCookies({
      name: Cookies.Session,
      values: session,
    });

    redirect(Routes.Members);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  try {
    const { data: loginUser } = await supabase
      .from(Tables.Members)
      .select("status")
      .eq("phoneNumber", formattedPhoneNumber)
      .single();
    // Add a check to prevent deactivated users from logging in
    if (loginUser?.status === UserStatus.Deactivated) {
      throw new Error("User not exist");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  try {
    // In success login case, update status and remove the invite link
    const { data: updatedUser } = await supabase
      .from(Tables.Members)
      .update({
        status: UserStatus.Active,
        invite_link: "",
      })
      .eq("phoneNumber", formattedPhoneNumber)
      .select("*")
      .single();
    // addCookies function get name and values that will store against name
    addCookies({
      name: Cookies.LoginUser,
      values: updatedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
