import { getMembers } from "@/app/(app)/members/actions/getMembers";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { AttendancePercentage, AttendanceProgress } from "@/constant/constant";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";

export const getMonthlyDigest = async () => {
  const supabase = await getSupabaseClient();
  const members = await getMembers("");
  const currentDate = new Date();
  const lastMonth = subMonths(currentDate, 1);

  // Get the start and end of the last month
  const startDate = startOfMonth(lastMonth);
  const endDate = endOfMonth(lastMonth);

  // Format the dates to match the required format
  const formattedStartDate = format(startDate, "yyyy-MM-dd HH:mm:ss.SSSSSS+00");
  const formattedEndDate = format(endDate, "yyyy-MM-dd HH:mm:ss.SSSSSS+00");

  // Extract all the member ids from the fetched members
  const targetIds = members.data.map((member) => member.id);

  const { data, error } = await supabase
    .from(Tables.Digest)
    .select("*")
    .lte("created_at", formattedEndDate)
    .gte("created_at", formattedStartDate);

  if (error) {
    console.error("Error fetching data: ", error);
    return [];
  }

  // Initialize counters for each target ID and category
  const counts = targetIds.reduce((acc, id) => {
    const member = members.data.find((m) => m.id === id);
    if (member) {
      acc[id] = {
        name: member.name,
        shift: member.shift,
        role: member.role,
        presents: 0,
        absents: 0,
        leaves: 0,
      };
    }
    return acc;
  }, {});

  // Iterate through each record and count occurrences of each target ID
  data.forEach((item) => {
    targetIds.forEach((id) => {
      // Check if the target ID is present in the "presents" array
      if (item.presents && item.presents.includes(id)) {
        counts[id].presents += 1;
      }
      // Check if the target ID is present in the "absents" array
      if (item.absents && item.absents.includes(id)) {
        counts[id].absents += 1;
      }
      // Check if the target ID is present in the "leaves" array
      if (item.leaves && item.leaves.includes(id)) {
        counts[id].leaves += 1;
      }
    });
  });

  // Calculate Attendance Percentage and Status
  const totalDaysInMonth = 6; // Fixed for the period 2025-02-01 to 2025-02-06, modify based on your logic

  const getStatus = (percentage: number): AttendanceProgress => {
    switch (true) {
      case percentage >= AttendancePercentage.Excellent:
        return AttendanceProgress.Excellent;
      case percentage >= AttendancePercentage.VeryGood:
        return AttendanceProgress.VeryGood;
      case percentage >= AttendancePercentage.Good:
        return AttendanceProgress.Good;
      case percentage >= AttendancePercentage.Average:
        return AttendanceProgress.Average;
      default:
        return AttendanceProgress.low;
    }
  };

  // Use counts object that was already populated instead of data.counts
  const transformedData = Object.keys(counts).map((key) => {
    const presentDays = counts[key].presents;
    const totalDays = totalDaysInMonth; // This value can be calculated dynamically for the month

    const attendancePercentage = ((presentDays / totalDays) * 100).toFixed(2);
    const status = getStatus(parseFloat(attendancePercentage));

    return {
      id: key,
      ...counts[key],
      attendancePercentage: `${attendancePercentage}%`,
      status,
    };
  });

  return transformedData || [];
};
