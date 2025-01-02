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
    const { data: authUserData, error } =
      await supabase.auth.signInWithPassword({
        phone: formattedPhoneNumber,
        password: password,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data: loginUser, error: userError } = await supabase
      .from(Tables.Members)
      .select("status")
      .eq("phoneNumber", formattedPhoneNumber)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    // Add a check to prevent deactivated users from logging in
    if (loginUser.status === UserStatus.Deactivated) {
      throw new Error("User not exist");
    }

    // In success login case, update status and remove the invite link
    const { data: updatedUser, error: updateError } = await supabase
      .from(Tables.Members)
      .update({
        status: UserStatus.Active,
        invite_link: "",
      })
      .eq("phoneNumber", formattedPhoneNumber)
      .select("*")
      .single();

    if (updateError) {
      throw new Error(updateError.message);
    }

    // Getting session
    const { session } = authUserData;

    // addCookies function get name and values that will store against name
    addCookies({
      name: Cookies.LoginUser,
      values: updatedUser,
    });

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
};
