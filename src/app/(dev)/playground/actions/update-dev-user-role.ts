"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UpdateDevUserRoleType } from "../components/UpdateDevUserForm";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";
import { addCookies } from "@/utils/cookiesManager";
import { Cookies } from "@/constant/constant";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

export const updateDevUserRole = async (values: UpdateDevUserRoleType) => {
  const supabase = await getSupabaseClient();
  const formattedPhoneNumber = intlNumberFormat(values.phoneNumber);

  const loggedInUser = await getLoggedInUser();

  const { data: updatedDevUser, error } = await supabase
    .from(Tables.Members)
    .update({
      role: values.role,
    })
    .eq("phoneNumber", formattedPhoneNumber)
    .select("*")
    .single();

  if (error) {
    throw error;
  } else {
    if (loggedInUser.phoneNumber === formattedPhoneNumber) {
      addCookies({
        name: Cookies.LoginUser,
        values: updatedDevUser,
      });
      return updatedDevUser;
    }
  }
};
