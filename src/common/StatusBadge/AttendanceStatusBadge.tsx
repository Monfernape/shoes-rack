import React from "react";
import { Badge } from "@/components/ui/badge";
import { AttendanceReportStatus } from "@/types";

const attendanceClasses = {
  excellent: {
    background: "bg-status-active-background",
    text: "text-status-active",
  },
  good: {
    background: "bg-status-active-background",
    text: "text-status-active",
  },
  verygood: {
    background: "bg-status-active-background",
    text: "text-status-active",
  },
  average: {
    background: "bg-status-pending-background",
    text: "text-status-pending",
  },
  low: {
    background: "bg-status-inactive-background",
    text: "text-status-inactive",
  },
} as const;

export const AttendanceStatusBadge = ({
  status,
}: {
  status: AttendanceReportStatus;
}) => {
  const { background, text } = attendanceClasses[status];

  return (
    <Badge
      className={`capitalize flex justify-center ${background} ${text} hover:${background} hover:${text}`}
    >
      {status}
    </Badge>
  );
};
