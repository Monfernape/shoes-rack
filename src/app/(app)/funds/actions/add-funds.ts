"use server";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/routes";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { FundSchemaType } from "../components/FundFormBuilder";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberRole } from "@/constant/constant";

export const addFunds = async (values: FundSchemaType) => {
  const supabase = await getSupabaseClient();
  const loggedInUser = await getLoggedInUser();
  const hasPermission = loggedInUser.role === MemberRole.Incharge;
  if(hasPermission){
    const { error } = await supabase.from(Tables.Funds).insert({
      member_id: values.memberId,
      amount: values.amount,
    });
    if (error) {
      return { error: error.message };
    }else{
      redirect(Routes.Fund);
    }
  }else{
    return {error:"You have not permission"};
  }
};
