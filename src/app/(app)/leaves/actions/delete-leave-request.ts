"use server";

import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { revalidatePath } from "next/cache";
import { hasLeaveRequestPermission } from "./has-leave-request-permission";

export const deleteLeaveRequest = async (requestId: number) => {
  const supabase = await getSupabaseClient();
  const isLeaveRequestAllowed = await hasLeaveRequestPermission(requestId)

  if(isLeaveRequestAllowed){
    const { error } = await supabase
    .from(Tables.Leaves)
    .delete()
    .eq("id", requestId);

  if (error) {
    throw error.message;
  }
  revalidatePath(Routes.LeaveRequest);
  }
  return;
};
