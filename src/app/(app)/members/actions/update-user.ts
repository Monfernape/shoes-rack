"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UpdateUser } from "../components/MemberFormBuilder";
import { Tables } from "@/lib/db";
import {  redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { MemberRole } from "@/constant/constant";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";
import { Member } from "@/types";

export const updateUser = async (values: UpdateUser, user: Member) => {
  const supabase = await getSupabaseClient();
  if (user.role === MemberRole.Member && user.id !== values.id) {
    return { error: "You have not permission" };
  }
  if (
    (user.role === MemberRole.ShiftIncharge && user.shift !== values.shift) ||
    (user.role === MemberRole.ShiftIncharge && values.role === user.role)
  ) {
    return { error: "You have not permission" };
  }
  const formattedPhoneNumber = intlNumberFormat(values.phoneNumber);
  const { error } = await supabase
    .from(Tables.Members)
    .update({ ...values, phoneNumber: formattedPhoneNumber })
    .eq("id", values.id);
  if (error) {
    return { error: error.message };
  }

  redirect(Routes.Members);
};
// return { error: "You have not permission" };
