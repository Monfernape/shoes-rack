"use server";

import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { LeavesRequestStatus } from "@/types";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
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
  const { error } = await supabase
    .from(Tables.Leaves)
    .update({ status: requestStatus })
    .eq("id", requestId);

  if (error) {
    throw error.message;
  }

  revalidatePath(Routes.LeaveRequest);
};
