"use server";

import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { revalidatePath } from "next/cache";
import { MissingShoeStatus } from "@/constant/constant";

interface Props {
  missingShoeId: number;
  missingShoeStatus: MissingShoeStatus;
}

export const processMissingShoeStatus = async ({
  missingShoeId,
  missingShoeStatus,
}: Props) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from(Tables.MissingShoes)
    .update({ status: missingShoeStatus })
    .eq("id", missingShoeId);

  if (error) {
    throw error.message;
  }

  revalidatePath(Routes.MissingShoes);
  return;
};
