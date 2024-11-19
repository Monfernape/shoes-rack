"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UpdateDevUserRole } from "../components/UpdateDevUserForm";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

export const updateDevUserRole = async (values: UpdateDevUserRole) => {
  const supabase = await getSupabaseClient();
  const userPhoneNumber = formatPhoneNumber(values.phoneNumber);

  const { data: updatedDevUser, error } = await supabase
    .from(Tables.Members)
    .update({
      role: values.role,
    })
    .eq("phoneNumber", userPhoneNumber)
    .select("*")
    .single();

  if (error) {
    throw error;
  } else {
    return updatedDevUser;
  }
};
