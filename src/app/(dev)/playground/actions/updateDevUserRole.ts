"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UpdateDevUserRoleType } from "../components/UpdateDevUserForm";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";


export const updateDevUserRole = async (values: UpdateDevUserRoleType) => {
  const supabase = await getSupabaseClient();
  const formattedPhoneNumber = intlNumberFormat(values.phoneNumber);

  const { data: updatedDevUser, error } = await supabase
    .from(Tables.Members)
    .update({
      role: values.role,
    })
    .eq("phoneNumber", formattedPhoneNumber)
    .select("*")
    .single();

  if (error) {
    throw error;
  } else {
    return updatedDevUser;
  }
};
