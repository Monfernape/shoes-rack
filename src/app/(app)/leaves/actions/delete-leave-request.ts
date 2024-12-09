"use server";

import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { revalidatePath } from "next/cache";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getLeaveRequestById } from "./get-leave-request-by-id";
import { getAccessToUser } from "@/utils/getAccessToUser";

export const deleteLeaveRequest = async (requestId: number) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const leaveRequest = await getLeaveRequestById(requestId);

  const { role : loggedUserRole, id: loggedUserId } = loginUser;
  const { status, memberId } = leaveRequest;

  const isAccessToUser = getAccessToUser({loggedUserId, loggedUserRole,memberId, status })

  if(isAccessToUser){
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
