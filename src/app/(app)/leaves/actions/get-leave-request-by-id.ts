"use server";

import { AttendanceStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { permanentRedirect } from "next/navigation";

export const getLeaveRequestById = async (requestId: number) => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from(Tables.Leaves)
    .select()
    .eq("id", requestId)
    .maybeSingle();

  if (error) {
    throw error.message;
  }
  if (data.status === AttendanceStatus.Approve ) {
    permanentRedirect(Routes.LeaveRequest); 
  }
  return data;
};
