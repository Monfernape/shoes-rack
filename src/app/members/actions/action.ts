"use server";
import { z } from "zod";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { UserStatus } from "@/constant/constant";
import { redirect } from "next/navigation";
import { userBuilderSchema } from "@/app/members/components/MemberFormBuilder";
import { Routes } from "@/lib/constants";

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
