"use server";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { MissingShoeStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { MissingSchemaType } from "../add/components/MissingShoesFormBuilder";

export const createMissingShoesReport = async (values: MissingSchemaType) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(Tables.MissingShoes).insert({
    ...values,
    status: MissingShoeStatus.Missing,
  });

  if (error) {
    return error;
  }

  redirect(Routes.MissingShoes);
};
