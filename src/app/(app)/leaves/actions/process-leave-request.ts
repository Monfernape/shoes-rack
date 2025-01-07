"use server";

import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { LeavesRequestStatus } from "@/types";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getLeaveRequestById } from "./get-leave-request-by-id";
import { getAccessToUser } from "@/utils/getAccessToUser";
import { revalidatePath } from "next/cache";

interface Props {
  requestId: number;
  requestStatus: LeavesRequestStatus;
}

export const processLeaveRequest = async ({
  requestId,
  requestStatus,
}: Props) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const leaveRequest = await getLeaveRequestById(requestId);

  const { role : loggedUserRole, id: loggedUserId } = loginUser;
  const { status, memberId } = leaveRequest;

  const isAccessToUser = getAccessToUser({loggedUserId, loggedUserRole,memberId, status })

  if (isAccessToUser) {
    const { error } = await supabase
      .from(Tables.Leaves)
      .update({ status: requestStatus })
      .eq("id", requestId);

    if (error) {
      throw error.message;
    }

    revalidatePath(Routes.LeaveRequest);
  }
  return;
};
