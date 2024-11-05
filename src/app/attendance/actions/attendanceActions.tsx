"use server";
import { AttendanceStatus, Table } from "@/types/index";
import { revalidatePath } from "next/cache";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";

type Attendance = {
  memberId: number;
  startTime: string;
  endTime: string;
};

export const setAttendance = async (values: Attendance) => {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase.from(Table.Attendance).insert({
    ...values,
    status: AttendanceStatus.Pending,
  });

  if (error) {
    console.error("Error:", error.message);
    throw new Error("Failed to set attendance. Please try again.");
  }

  console.log("Attendance successfully set:", data);

  revalidatePath("/attendance");
};
