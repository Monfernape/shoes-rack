import React from "react";
import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/constant/constant";

const statusClasses = {
  active: {
    background: "bg-status-active-background",
    text: "text-status-active",
  },
  
  inactive: {
    background: "bg-status-inactive-background",
    text: "text-status-inactive",
  },
  deactivated : {
    background : "",
    text:""
  }
} as const;

export const UserStatusBadge = ({ status }: { status: UserStatus }) => {
  const { background, text } = statusClasses[status];

  return (
    <Badge
      className={`capitalize flex justify-center ${background} ${text} hover:${background} hover:${text} hover:cursor-pointer`}
    >
      {status}
    </Badge>
  );
};
