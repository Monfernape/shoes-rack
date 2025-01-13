"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { z } from "zod";
import { Routes } from "@/lib/routes";
import { FundSchema } from "../components/FundFormBuilder";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberRole } from "@/constant/constant";
import { redirect } from "next/navigation";
import { getUserById } from "../../members/actions/get-user-by-id";

export const updateFundDetails = async (
  fundId: number,
  values: z.infer<typeof FundSchema>
) => {
  const supabase = await getSupabaseClient();
  const loggedInUser = await getLoggedInUser();
  if (loggedInUser.role === MemberRole.Member) {
    return { error: "You have not permission" };
  }
  if (loggedInUser?.role === MemberRole.ShiftIncharge) {
    const member = await getUserById(values.memberId);
    if (member.shift !== loggedInUser.shift) {
      return { error: "You have not permission" };
    }
    if (member.role === loggedInUser.role) {
      return { error: "You have not permission" };
    }
  }

  const { error } = await supabase
    .from(Tables.Funds)
    .update({
      member_id: values.memberId,
      amount: values.amount,
    })
    .eq("id", fundId);

  if (error) {
    return { error: error.message };
  } else {
    redirect(Routes.Fund);
  }
};
