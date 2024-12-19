"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Routes } from "@/lib/routes";
import { FundSchema } from "../components/FundFormBuilder";

export const updateFundDetails = async (
  fundId: number,
  values: z.infer<typeof FundSchema>
) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
    .from(Tables.Funds)
    .update({
      member_id: values.memberId,
      amount: values.amount,
    })
    .eq("id", fundId);

  if (error) {
    throw error.message;
  }

  revalidatePath(Routes.Fund);
};
