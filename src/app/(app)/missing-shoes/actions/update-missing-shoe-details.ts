"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { MissingShoeStatus } from "@/constant/constant";
import { revalidatePath } from "next/cache";
import { Routes } from "@/lib/routes";
import { MissingSchemaType } from "../add/components/MissingShoesFormBuilder";

export const updateMissingShoeReport = async (
  missingShoeReportId: number,
  values: MissingSchemaType
) => {
  const supabase = await getSupabaseClient();
  const { shoesToken, ownerName, ownerPhoneNumber, ownerAddress, ...rest } =
    values;
  const { error } = await supabase
    .from(Tables.MissingShoes)
    .update({
      ...rest,
      shoes_token: shoesToken,
      owner_name: ownerName,
      owner_phone_number: ownerPhoneNumber,
      owner_address: ownerAddress,
      status: MissingShoeStatus.Missing,
    })
    .eq("id", missingShoeReportId);

  if (error) {
    throw error.message;
  }

  revalidatePath(Routes.MissingShoes);
};
