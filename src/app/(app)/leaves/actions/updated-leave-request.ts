"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { leaveRequestSchema } from "../add/components/LeaveRequestFormBuilder";
import { z } from "zod";
import { LeaveRequestStatus } from "@/constant/constant";
import { revalidatePath } from "next/cache";
import { Routes } from "@/lib/routes";

export const updateLeaveRequest = async (
  requestId: number,
  values: z.infer<typeof leaveRequestSchema>
) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase
    .from(Tables.Leaves)
    .update({
      memberId: Number(values.memberId),
      leaveType: values.leaveType,
      startDate: values.date.from.toISOString(),
      endDate: values.date.to.toISOString(),
      reason: values.reason,
      status: LeaveRequestStatus.Pending,
    })
    .eq("id", requestId);

  if (error) {
    throw error.message;
  }

  revalidatePath(Routes.LeaveRequest);
};
