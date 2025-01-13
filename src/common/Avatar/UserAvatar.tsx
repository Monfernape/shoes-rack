import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = ({
  userName,
  size = "default",
}: {
  userName: string;
  size?: "default" | "large";
}) => {
  const firstLetter = userName
    .split(" ")
    .map((n) => n[0])
    .join("");
  const avatarSize =
    size === "large" ? "w-32 h-32 text-3xl " : "w-10 h-10 text-sm";
  return (
    <Avatar className={`${avatarSize} text-gray-700`}>
      <AvatarFallback data-testid="avatarFallback">
        {firstLetter}
      </AvatarFallback>
    </Avatar>
  );
};
