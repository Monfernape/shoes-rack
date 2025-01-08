"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { z } from "zod";
import { Routes } from "@/lib/routes";
import { FundSchema } from "../components/FundFormBuilder";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberRole } from "@/constant/constant";
import { redirect } from "next/navigation";

export const updateFundDetails = async (
  fundId: number,
  values: z.infer<typeof FundSchema>
) => {
  const supabase = await getSupabaseClient();

  const loggedInUser = await getLoggedInUser();

  const hasPermission = loggedInUser.role === MemberRole.Incharge;

  if (hasPermission) {
    const { error } = await supabase
      .from(Tables.Funds)
      .update({
        member_id: values.memberId,
        amount: values.amount,
      })
      .eq("id", fundId);

    if (error) {
      return { error: error.message };
    }else{
      redirect(Routes.Fund);
    }

  } else {
    return { error: "You have not permission" };
  }

};
