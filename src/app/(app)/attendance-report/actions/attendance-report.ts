"use server";

import {
  AttendancePercentage,
  AttendanceProgress,
  AttendanceStatus,
} from "@/constant/constant";
import { getAttendance } from "../../attendance/actions/getAttendance";

export const getAttendanceReport = async () => {
  const attendanceData = await getAttendance();

  if (!attendanceData) return [];

  const getStatus = (percentage: number): AttendanceProgress => {
    switch (true) {
      case percentage > AttendancePercentage.Excellent:
        return AttendanceProgress.Excellent;
      case percentage > AttendancePercentage.VeryGood:
        return AttendanceProgress.VeryGood;
      case percentage > AttendancePercentage.Good:
        return AttendanceProgress.Good;
      case percentage > AttendancePercentage.Average:
        return AttendanceProgress.Average;
      default:
        return AttendanceProgress.low;
    }
  };

  // Get the first day of the month and today's date
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Total attendance days of current month
  const totalAttendanceDays = (dateString: string) => {
    const date = new Date(dateString);
    return date >= firstDayOfMonth && date <= today;
  };

  const uniqueMembers = Array.from(
    new Set(attendanceData.map((attendance) => attendance.memberId))
  );

  const monthlyAttendanceReport = uniqueMembers.map((memberId) => {
    const memberAttendance = attendanceData.filter(
      (attendance) =>
        attendance.memberId === memberId &&
        totalAttendanceDays(attendance.created_at)
    );

    const presentDays = new Set(
      memberAttendance
        .filter((attendance) => attendance.status === AttendanceStatus.Approve)
        .map((attendance) => attendance.created_at?.split("T")[0])
    );

    const absentDays = new Set(
      memberAttendance
        .filter((attendance) => attendance.status === AttendanceStatus.Reject)
        .map((attendance) => attendance.created_at?.split("T")[0])
    );

    // For the time being i do this i created a separate ticket for it ans it fix in next Pr.
    const leaveDays = new Set(
      memberAttendance
        .filter((attendance) => attendance.status === AttendanceStatus.Pending)
        .map((attendance) => attendance.created_at?.split("T")[0])
    );

    const totalDaysInMonth = today.getDate(); // Number of days up to today
    const monthlyPresentCount = presentDays.size;
    const attendancePercentage = (
      (monthlyPresentCount / totalDaysInMonth) *
      100
    ).toFixed(2);
    const status = getStatus(parseFloat(attendancePercentage));

    const memberInfo = attendanceData.find(
      (attendance) => attendance.memberId === memberId
    );

    return {
      name: memberInfo?.name,
      attendancePercentage: `${attendancePercentage}%`,
      status,
      present: monthlyPresentCount,
      absent: absentDays.size,
      leave: leaveDays.size,
      createdAt: memberInfo?.created_at,
    };
  });
  return monthlyAttendanceReport;
};
