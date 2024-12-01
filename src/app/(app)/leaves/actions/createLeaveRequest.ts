"use server";

import { z } from "zod";
import { leaveRequestSchema } from "../add/components/LeaveRequestFormBuilder";
import { redirect } from "next/navigation";
import { LeaveRequestStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const createLeaveRequest = async (
  values: z.infer<typeof leaveRequestSchema>
) => {
  const supabase = await getSupabaseClient();
  const { error } = await supabase.from(Tables.Leaves).insert({
    memberId: Number(values.memberId),
    leaveType: values.leaveType,
    startDate: values.date.from.toISOString(),
    endDate: values.date.to.toISOString(),
    reason: values.reason,
    status: LeaveRequestStatus.Pending,
  });

  if (error) {
    return error;
  }

  redirect(Routes.LeaveRequest);
};
