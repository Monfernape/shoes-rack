"use server";
import { z } from "zod";
import { userBuilderSchema } from "../components/MemberFormBuilder";

import { Tables } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";

export const createUser = async (values: z.infer<typeof userBuilderSchema>) => {
  const supabase = await getSupabaseClient();

  const { status, error } = await supabase.from(Tables.Members).insert({
    ...values,
  });
  if (status === 201) {
    return status;
  }
  revalidatePath(Routes.AddMember);
  return values;
};
