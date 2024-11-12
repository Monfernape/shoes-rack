"use server";
import { z } from "zod";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { leaveRequestSchema } from "../add/components/LeaveRequestFormBuilder";
import { redirect } from "next/navigation";

export const onCreateLeaveRequest = async (
  values: z.infer<typeof leaveRequestSchema>
) => {
  console.log({ values });
  const supabase = await getSupabaseClient();
  const { error } = await supabase.from("leaves").insert({
    memberId: Number(values.memberId),
    leaveType: values.leaveType,
    startDate: values.startDate.toISOString(),
    endDate: values.endDate.toISOString(),
    reasonForLeave: values.reason,
    status: "pending",
  });

  if (error) {
    return error;
  }

  redirect("/leaves");
};
