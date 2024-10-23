"use server";
import { z } from "zod";
import { formSchema } from "../app/member/components/MemberEditPage";
import { getSupabaseClient } from "@/utils/supabase/client";
import { Tables } from "@/lib/db";
import { Status } from "@/constant/constant";
import { revalidatePath } from "next/cache";

export const onSubmit = async (values: z.infer<typeof formSchema>) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(Tables.Members).insert({
    ...values,
    status: Status.Inactive,
  });
  if (error) {
    return;
  }
  revalidatePath("/members/edit");
};
