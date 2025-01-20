"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UpdateUser } from "../components/MemberFormBuilder";
import { Tables } from "@/lib/db";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { MemberRole } from "@/constant/constant";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";
import { Member } from "@/types";
import { ERROR_MESSAGE } from "@/constant/error";

export const updateUser = async (values: UpdateUser, user: Member) => {
  const supabase = await getSupabaseClient();
  if (user.role === MemberRole.Member && user.id !== values.id) {
    return { error: ERROR_MESSAGE.GENERAL.ACCESS_DENIED };
  }
  if (
    (user.role === MemberRole.ShiftIncharge && user.shift !== values.shift) ||
    (user.role === MemberRole.ShiftIncharge && values.role === user.role)
  ) {
    return { error: ERROR_MESSAGE.GENERAL.ACCESS_DENIED };
  }
  const formattedPhoneNumber = intlNumberFormat(values.phoneNumber);
  const { error } = await supabase
    .from(Tables.Members)
    .update({ ...values, phoneNumber: formattedPhoneNumber })
    .eq("id", values.id);
  if (error) {
    if (error.details.includes("phoneNumber")) {
      return { error: ERROR_MESSAGE.MEMBERS.DUPLICATE_PHONENUMBER };
    } 
    else if (error.details.includes("cnic")) {
      return { error: ERROR_MESSAGE.MEMBERS.DUPLICATE_CNIC };
    }
    return { error: ERROR_MESSAGE.GENERAL.SOMETHING_WENT_WRONG };
  }

  redirect(Routes.Members);
};
// return { error: "You have not permission" };
