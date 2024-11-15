"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UserBuilder } from "../components/MemberFormBuilder";
import { Tables } from "@/lib/db";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";

export const updateUser = async (values: UserBuilder, id: number) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
    .from(Tables.Members)
    .update({ ...values })
    .eq("id", id);
  if (error) {
    throw error;
  }

  redirect(Routes.Member);
};
