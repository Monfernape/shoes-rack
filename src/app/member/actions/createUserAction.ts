"use server";
import { z } from "zod";
import { userBuilderSchema } from "../components/MemberFormBuilder";
import { Tables } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";

export const createUser = async (values: z.infer<typeof userBuilderSchema>) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(Tables.Members).insert({
    ...values,
    status: "inactive",
  });

  if (error) {
    return {
      title: "Error in creating user",
      message: error.message,
    };
  }
  revalidatePath(Routes.AddMember);
  return {
    title: "User created successfully",
    message: "You will receive an email confirmation shortly.",
  };
};
