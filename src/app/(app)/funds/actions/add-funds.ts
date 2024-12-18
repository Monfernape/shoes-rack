"use server";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { FundSchemaType } from "../components/FundFormBuilder";

export const addFunds = async (values: FundSchemaType) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase.from(Tables.Funds).insert(values);
  if (error) {
    return error;
  }

  redirect(Routes.Fund);
};
