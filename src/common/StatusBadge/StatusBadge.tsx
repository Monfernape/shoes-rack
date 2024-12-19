import React from "react";
import { Badge } from "@/components/ui/badge";
import { LeavesRequestStatus } from "@/types";
import { AttendanceStatus } from "@/constant/constant";

const statusClasses = {
  approved: {
    background: "bg-status-active-background",
    text: "text-status-active",
  },
  pending: {
    background: "bg-status-pending-background",
    text: "text-status-pending",
  },
  rejected: {
    background: "bg-status-inactive-background",
    text: "text-status-inactive",
  },
} as const;

export const StatusBadge = ({
  status,
}: {
  status: LeavesRequestStatus | AttendanceStatus;
}) => {
  const { background, text } = statusClasses[status];

  return (
    <Badge
      className={`capitalize flex justify-center ${background} ${text} hover:${background} hover:${text} hover:cursor-pointer`}
    >
      {status}
    </Badge>
  );
};
