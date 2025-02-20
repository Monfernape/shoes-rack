"use server";

import { z } from "zod";
import { leaveRequestSchema } from "../add/components/LeaveRequestFormBuilder";
import { LeaveRequestStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";

export const createLeaveRequest = async (
  values: z.infer<typeof leaveRequestSchema>
) => {
  const updatedDate = {
    ...values,
    date: {
      ...values.date,
      from:   new Date(values.date.from).setDate(new Date(values.date.from).getDate() + 1),
      to: values.date.to
        ? new Date(
            new Date(values.date.to).setDate(new Date(values.date.to).getDate() + 1)
          )
        : values.date.from,
    },
  };

  const supabase = await getSupabaseClient();
  const { error } = await supabase.from(Tables.Leaves).insert({
    memberId: Number(values.memberId),
    leaveType: values.leaveType,
    startDate: new Date(updatedDate.date.from).toISOString(),
    endDate: new Date(updatedDate.date.to).toISOString(),
    reason: values.reason,
    status: LeaveRequestStatus.Pending,
  });

  if (error) {
    return { error: error.message };
  }

  redirect(Routes.LeaveRequest);
};
