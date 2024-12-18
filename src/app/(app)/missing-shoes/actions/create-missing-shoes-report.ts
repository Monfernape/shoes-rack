"use server";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { MissingShoeStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { MissingSchemaType } from "../add/components/MissingShoesFormBuilder";

export const reportMissingShoe = async (values: MissingSchemaType) => {
  const supabase = await getSupabaseClient();
  const { shoesToken, ownerName, ownerPhoneNumber, ownerAddress, ...rest } =
    values;

  const { error } = await supabase.from(Tables.MissingShoes).insert({
    ...rest,
    shoes_token: shoesToken,
    owner_name: ownerName,
    owner_phone_number: ownerPhoneNumber,
    owner_address: ownerAddress,
    status: MissingShoeStatus.Missing,
  });

  if (error) {
    return error;
  }

  redirect(Routes.MissingShoes);
};
