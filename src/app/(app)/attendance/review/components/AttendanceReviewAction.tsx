import { Button } from "@/components/ui/button";
import { AttendanceReviewStatus } from "@/types";
import React from "react";

interface AttendanceButtonGroupProps {
  attendnaceId: number;
  attendanceStatus: AttendanceReviewStatus;
  onMarkAttendance: (memberId: number, status: AttendanceReviewStatus) => void;
}

export const AttendanceReviewAction = ({
  attendnaceId,
  attendanceStatus,
  onMarkAttendance,
}: AttendanceButtonGroupProps) => {
  const buttonVariants = {
    Present:
      attendanceStatus === AttendanceReviewStatus.Approve
        ? "default"
        : "outline",
    Absent:
      attendanceStatus === AttendanceReviewStatus.Reject
        ? "default"
        : "outline",
    Leave:
      attendanceStatus === AttendanceReviewStatus.Leave ? "default" : "outline",
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onMarkAttendance(attendnaceId, AttendanceReviewStatus.Approve)
        }
        className={`rounded-l-md rounded-r-none ${
          attendanceStatus === AttendanceReviewStatus.Approve
            ? "border-status-active-background text-status-active bg-status-active-background hover:bg-status-active-background hover:text-status-active "
            : ""
        }`}
      >
        P
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onMarkAttendance(attendnaceId, AttendanceReviewStatus.Reject)
        }
        className={`rounded-none border-x ${
          attendanceStatus === AttendanceReviewStatus.Reject
            ? "border-status-inactive-background text-status-inactive bg-status-inactive-background hover:bg-status-inactive-background hover:text-status-inactive "
            : ""
        }`}
      >
        A
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onMarkAttendance(attendnaceId, AttendanceReviewStatus.Leave)
        }
        className={`rounded-r-md rounded-l-none ${
          attendanceStatus === AttendanceReviewStatus.Leave
            ? "border-status-pending-background text-status-pending bg-status-pending-background hover:bg-status-pending-background hover:text-status-pending "
            : ""
        }`}
      >
        L
      </Button>
    </div>
  );
};
