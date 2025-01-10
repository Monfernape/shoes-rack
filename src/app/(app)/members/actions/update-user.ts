"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UpdateUser } from "../components/MemberFormBuilder";
import { Tables } from "@/lib/db";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { getEditPermissions } from "@/common/Actions/getEditPermissions";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberRole } from "@/constant/constant";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";

export const updateUser = async (values: UpdateUser) => {
  const supabase = await getSupabaseClient();

  const loggedInUser = await getLoggedInUser();
  const isLoggedInUserMember = loggedInUser.role === MemberRole.Member;
  const { hasEditPermission } = await getEditPermissions(values.id);

  if (hasEditPermission && !isLoggedInUserMember) {
    const formattedPhoneNumber = intlNumberFormat(values.phoneNumber);
    const { error } = await supabase
      .from(Tables.Members)
      .update({ ...values, phoneNumber: formattedPhoneNumber })
      .eq("id", values.id);
    if (error) {
      return { error: error.message };
    }

    redirect(Routes.Members);
  } else {
    return { error: "You have not permission" };
  }
};
