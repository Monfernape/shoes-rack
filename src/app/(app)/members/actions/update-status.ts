import { Member } from '@/types';
"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { Tables } from "@/lib/db";
import { UserStatus } from "@/constant/constant";
import { revalidatePath } from "next/cache";
import { Routes } from '@/lib/routes';
import { redirect } from 'next/navigation';

export const updateMemberStatus = async (id: number) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
  .from(Tables.Members)
  .update({ status: UserStatus.Active })
  .eq('id', id)

  if (error) {
    return  {
      message:error.message
    };
  }

redirect(Routes.Members)
};
