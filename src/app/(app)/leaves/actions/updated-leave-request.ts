"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { leaveRequestSchema } from "../add/components/LeaveRequestFormBuilder";
import { z } from "zod";
import { LeaveRequestStatus } from "@/constant/constant";
import { revalidatePath } from "next/cache";
import { Routes } from "@/lib/routes";
import { getEditPermissions } from "@/common/Actions/getEditPermissions";

export const updateLeaveRequest = async (
  requestId: number,
  values: z.infer<typeof leaveRequestSchema>
) => {
  const supabase = await getSupabaseClient();
  const { hasEditPermission } = await getEditPermissions(
    Number(values.memberId)
  );
  if (hasEditPermission) {
    const { error } = await supabase
      .from(Tables.Leaves)
      .update({
        memberId: Number(values.memberId),
        leaveType: values.leaveType,
        startDate: values.date.from.toISOString(),
        endDate: values.date.to
          ? values.date.to.toISOString()
          : values.date.from.toISOString(),
        reason: values.reason,
        status: LeaveRequestStatus.Pending,
      })
      .eq("id", requestId);

    if (error) {
      return { error: error.message };
    }else{
      revalidatePath(Routes.LeaveRequest);
    }
  } else {
    return { error: "You have not permission" };
  }
};
