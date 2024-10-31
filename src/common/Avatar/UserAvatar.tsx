import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = ({ userName }: { userName: string }) => {
  const firstLetter =  userName.split(' ').map(n => n[0]).join('') 
  return (
      <Avatar className="w-12 h-12 text-gray-700">
        <AvatarFallback>{firstLetter}</AvatarFallback>
      </Avatar>
  );
};
