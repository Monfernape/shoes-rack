import React from "react";
import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      className={`capitalize flex justify-center ${
        status === "active"
          ? "bg-status-active-background text-status-active hover:bg-status-active-background hover:text-status-active"
          : "bg-status-invited-background text-status-invited hover:bg-status-invited-background hover:text-status-invited"
      }`}
    >
      {status}
    </Badge>
  );
};
