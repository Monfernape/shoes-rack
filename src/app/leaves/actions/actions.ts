"use server";
import { z } from "zod";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { leaveRequestSchema } from "../add/components/LeaveRequestFormBuilder";
import { redirect } from "next/navigation";
import { LeaveRequestStatus } from "@/constant/constant";

export const onCreateLeaveRequest = async (
  values: z.infer<typeof leaveRequestSchema>
) => {

  const supabase = await getSupabaseClient();
  const { error } = await supabase.from("leaves").insert({
    memberId: Number(values.memberId),
    leaveType: values.leaveType,
    startDate: values.startDate.toISOString(),
    endDate: values.endDate.toISOString(),
    reasonForLeave: values.reason,
    status: LeaveRequestStatus.Pending,
  });

  if (error) {
    return error;
  }

  redirect("/leaves");
};
