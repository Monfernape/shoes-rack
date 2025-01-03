"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UpdateUser } from "../components/MemberFormBuilder";
import { Tables } from "@/lib/db";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { getEditPermissions } from "@/common/Actions/getEditPermissions";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

export const updateUser = async (values: UpdateUser) => {
  const supabase = await getSupabaseClient();

  const loggedInUser = await getLoggedInUser();
  const isLoggedInUserMember = loggedInUser.member;

  const { hasEditPermission } = await getEditPermissions(values.id);
  
  if (hasEditPermission || isLoggedInUserMember) {
    const { error } = await supabase
      .from(Tables.Members)
      .update({ ...values })
      .eq("id", values.id);
    if (error) {
      return {error: error.message};
    }

    redirect(Routes.Members);
  } else {
    return { error: "You have not permission" };
  }
};
