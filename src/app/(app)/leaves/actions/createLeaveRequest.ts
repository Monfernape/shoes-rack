"use server";

import { z } from "zod";
import { leaveRequestSchema } from "../add/components/LeaveRequestFormBuilder";
import { LeaveRequestStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { revalidatePath } from "next/cache";

export const createLeaveRequest = async (
  values: z.infer<typeof leaveRequestSchema>
) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase.from(Tables.Leaves).insert({
    memberId: Number(values.memberId),
    leaveType: values.leaveType,
    startDate: values.date.from.toISOString(),
    endDate: values.date.to ? values.date.to.toISOString() : values.date.from.toISOString(),
    reason: values.reason,
    status: LeaveRequestStatus.Pending,
  });

  if (error) {
    return error;
  }

  revalidatePath(Routes.LeaveRequest);
};
