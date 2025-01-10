
"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { Tables } from "@/lib/db";
import { UserStatus } from "@/constant/constant";
import { Routes } from '@/lib/routes';
import { redirect } from 'next/navigation';

export const updateMemberStatus = async (id: number,status:UserStatus) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
  .from(Tables.Members)
  .update({ status })
  .eq('id', id)

  if (error) {
    return  {
      message:error.message
    };
  }

redirect(Routes.Members)
};
