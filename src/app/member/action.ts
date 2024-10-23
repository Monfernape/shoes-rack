"use server";
import { z } from "zod";
import { formSchema } from "./components/UserForm";
import { getSupabaseClient } from "@/utils/supabase/client";
import { Tables } from "@/lib/db";
import { Status } from "@/constant/constant";

export const onSubmit = async (values: z.infer<typeof formSchema>) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(Tables.Members).insert({
    ...values,
    status: Status.Inactive,
  });
  if (error) {
    return;
  }
};
