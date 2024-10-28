"use server";
import { z } from "zod";
import { formSchema } from "./MemberEditPage";
import { getSupabaseClient } from "@/utils/supabase/client";
import { Tables } from "@/lib/db";
import { Status } from "@/constant/constant";
import { revalidatePath } from "next/cache";
import { Routes } from "@/lib/routes";

export const onSubmit = async (values: z.infer<typeof formSchema>) => {
  // const supabase = await getSupabaseClient();

  // const { status, error } = await supabase.from(Tables.Members).insert({
  //   ...values,
  // });
  // if (status === 201) {
  //   return status;
  // }
  // revalidatePath(Routes.MemberEditRequest);
  return values;
};
