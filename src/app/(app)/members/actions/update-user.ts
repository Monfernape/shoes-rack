"use server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { UpdateUser } from "../components/MemberFormBuilder";
import { Tables } from "@/lib/db";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";

export const updateUser = async (values: UpdateUser) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
    .from(Tables.Members)
    .update({ ...values })
    .eq("id", values.id);
    if (error) {
      if (error.details.includes("phoneNumber")) {
        return { message: "Phone number is already  exist" };
      }
      else if (error.details.includes('cnic')) {
        return { message: "CNIC is already exist" };
      }
      else {
        return {message : error.message}
      }
     
    }
  redirect(Routes.Members);
};
