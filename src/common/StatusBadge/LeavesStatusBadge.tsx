import React from "react";
import { Badge } from "@/components/ui/badge";
import { LeavesRequestStatus } from "@/types";

const statusClasses = {
  accept: {
    background: "bg-status-active-background",
    text: "text-status-active",
  },
  pending: {
    background: "bg-status-pending-background",
    text: "text-status-pending",
  },
  reject: {
    background: "bg-status-inactive-background",
    text: "text-status-inactive",
  },
} as const;

export const LeavesStatusBadge = ({
  status,
}: {
  status: LeavesRequestStatus;
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
