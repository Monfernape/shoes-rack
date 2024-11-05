"use server";
import { AttendanceStatus, Table } from "@/types/index";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import { ATTENDANCE_PATH } from "@/constant/constant";

type Attendance = {
  memberId: number;
  startTime: string;
  endTime: string;
};

export const onAttandanceRequset = async (values: Attendance) => {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(Table.Attendance).insert({
    ...values,
    status: AttendanceStatus.Pending,
  });

  if (error) {
    return error;
  }

  redirect(ATTENDANCE_PATH);
};
