"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { Tables } from "@/lib/db";
import { UserStatus } from "@/constant/constant";

export const updateMemberStatus = async (id: number) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
  .from(Tables.Members)
  .update({ status: UserStatus.Active })
  .eq('id', id)

  if (error) {
    throw error;
  }

return 
};
