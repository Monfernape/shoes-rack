import React from "react";
import { Badge } from "@/components/ui/badge";
import { MissingShoeStatus } from "@/constant/constant";

const statusClasses = {
  found: {
    background: "bg-status-active-background",
    text: "text-status-active",
  },
  missing: {
    background: "bg-status-inactive-background",
    text: "text-status-inactive",
  },
} as const;

export const MissingShoesStatusBadge = ({
  status,
}: {
  status: MissingShoeStatus;
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
