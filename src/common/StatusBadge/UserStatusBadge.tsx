import React from "react";
import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/constant/constant";

const statusClasses = {
  active: {
    background: "bg-status-active-background",
    text: "text-status-active",
  },
  inactive: {
    background: "bg-status-pending-background",
    text: "text-status-pending",
  },
  deactivated: {
    background: "bg-status-inactive-background",
    text: "text-status-inactive",
  },
 
} as const;

export const UserStatusBadge = ({ status }: { status: UserStatus }) => {
  const { background, text } = statusClasses[status];

  return (
    <Badge
      className={`capitalize flex justify-center ${background} ${text} hover:${background} hover:${text}`}
    >
      {status}
    </Badge>
  );
};
