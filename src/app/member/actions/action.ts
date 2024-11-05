"use server";
import { z } from "zod";
import { userBuilderSchema } from "../components/MemberFormBuilder";
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { UserStatus } from "@/constant/constant";
import { redirect } from "next/navigation";

export const createUser = async (values: z.infer<typeof userBuilderSchema>) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(Tables.Members).insert({
    ...values,
    date_of_birth: values.date_of_birth.toISOString(),
    ehad_duration: values.ehad_duration.toISOString(),
    status: UserStatus.Inactive,
  });
  if (error) {
    return error;
  }

  redirect(Routes.Member);
};
