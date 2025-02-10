"use server";
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { LeavesRequestStatus } from "@/types";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
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
  const { role: loggedUserRole, id: loggedUserId } = loginUser;
  const memberId = requestId;
  const status = requestStatus;
  const isAccessToUser = getAccessToUser({
    loggedUserId,
    loggedUserRole,
    memberId,
    status,
  });
  if (!isAccessToUser) {
    throw "no access";
  }
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
};