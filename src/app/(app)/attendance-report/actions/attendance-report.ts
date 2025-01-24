"use server";

import {
  AttendancePercentage,
  AttendanceProgress,
  AttendanceStatus,
  LeaveRequestStatus,
} from "@/constant/constant";
import { getAttendance } from "../../attendance/actions/getAttendance";
import { getleaves } from "../../leaves/actions/get-leave-request-by-date";

export const getAttendanceReport = async () => {
  const attendanceData = await getAttendance("");
  const leaveData = await getleaves();

  if (!attendanceData) return [];

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

  const getTotalDaysInCurrentMonth = (): number => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  };

  const totalDaysInMonth = getTotalDaysInCurrentMonth();

  const uniqueMembers = Array.from(new Set(attendanceData.map(({ memberId }) => memberId)));

  const monthlyAttendanceReport = uniqueMembers.map((memberId) => {
    const memberAttendance = attendanceData.filter(({ memberId: id }) => id === memberId);

    const presentDays = new Set(
      memberAttendance
        .filter(({ status }) => status === AttendanceStatus.Approve)
        .map(({ created_at }) => new Date(created_at).toLocaleDateString())
    );

    const absentDays = new Set(
      memberAttendance
        .filter(({ status }) => status === AttendanceStatus.Reject)
        .map(({ created_at }) => new Date(created_at).toLocaleDateString())
    );

    const approvedLeavesCount = leaveData.filter(
      ({ memberId: id, status }) => id === memberId && status === LeaveRequestStatus.Approve
    ).length;

    const attendancePercentage = ((presentDays.size / totalDaysInMonth) * 100).toFixed(2);
    const status = getStatus(parseFloat(attendancePercentage));

    const memberInfo = attendanceData.find(({ memberId: id }) => id === memberId);

    return {
      name: memberInfo?.name || "" ,
      attendancePercentage: `${attendancePercentage}%`,
      status,
      present: presentDays.size,
      absent: absentDays.size,
      leave: approvedLeavesCount,
      createdAt: memberInfo?.created_at,
    };
  });

  const monthlyReport = Array.isArray(monthlyAttendanceReport)
    ? monthlyAttendanceReport
    : [];
  return monthlyReport;
};
