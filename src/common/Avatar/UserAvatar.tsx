import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = ({ userName }: { userName: string }) => {
  const firstLetter =  userName.split(' ').map(n => n[0]).join('') 
  return (
      <Avatar className="w-10 h-10 text-gray-700 text-sm">
        <AvatarFallback data-testid="avatarFallback">{firstLetter}</AvatarFallback>
      </Avatar>
  );
};
