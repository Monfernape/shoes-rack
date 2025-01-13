"use server";

import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import moment from "moment";
import { Tables } from "@/lib/db";
import { Attendance } from "@/types";

export const getAttendanceReportByMemberId = async (memberId: number) => {
  const supabase = await getSupabaseClient();

  // first day of current month
  const firstDay = moment()
    .startOf("month")
    .utc()
    .format("YYYY-MM-DD HH:mm:ss.SSSSSS+00");

  const currentDate = moment()
    .utc() // ensures it uses UTC time
    .format("YYYY-MM-DD HH:mm:ss.SSSSSS+00");

  const { data: attendance, error: attendanceError } = await supabase
    .from(Tables.Attendance)
    .select()
    .eq("memberId", memberId)
    .gte("created_at", firstDay)
    .lte("created_at", currentDate);

  const { data: leaves, error: leavesError } = await supabase
    .from(Tables.Leaves)
    .select()
    .eq("memberId", 381)
    .gte("startDate", moment().startOf("month").utc().format("YYYY-MM-DD"))
    .lte("startDate", moment().utc().format("YYYY-MM-DD"));

  if (attendanceError || leavesError) {
    return {
      presentCount: 0,
      absentCount: 0,
      totalApprovedLeaveDays: 0,
    };
  }

  const uniqueAttendance: Attendance[] = [];
  const seenTimestamps = new Set();

  attendance?.forEach((item) => {
    if (!seenTimestamps.has(item.created_at)) {
      seenTimestamps.add(item.created_at);
      uniqueAttendance.push(item);
    }
  });

  let presentCount = 0;
  let absentCount = 0;

  uniqueAttendance.forEach(({ status }) => {
    if (status === "approved") {
      presentCount++;
    } else if (status === "rejected") {
      absentCount++;
    }
  });

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  let totalApprovedLeaveDays = 0;

  leaves?.forEach((leave) => {
    const leaveStartDate = new Date(leave.startDate);
    const leaveEndDate = new Date(leave.endDate);

    if (
      leave.status === "approved" &&
      leaveStartDate >= firstDayOfMonth &&
      leaveStartDate <= today
    ) {
      let diffInTime;

      if (leaveEndDate <= today) {
        diffInTime = leaveEndDate.getTime() - leaveStartDate.getTime();
      } else {
        const formattedDate = moment().utc().format("YYYY-MM-DD");
        diffInTime =
          new Date(formattedDate).getTime() - leaveStartDate.getTime();
      }
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)) + 1;
      totalApprovedLeaveDays += diffInDays;
    }
  });

  return {
    presentCount,
    absentCount,
    totalApprovedLeaveDays,
  };
};
