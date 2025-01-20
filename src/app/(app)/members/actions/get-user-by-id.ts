import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getUserById = async (id: string) => {
  const supabase = await getSupabaseClient();
  const { data: member, error } = await supabase
    .from(Tables.Members)
    .select()
    .eq("id", Number(id))
    .single();
  if (error) {
    return { error: error.message };
  }

  return member;
};
