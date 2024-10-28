import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = ({ user_name }: { user_name: string }) => {
  const first_letter =  user_name.split(' ').map(n => n[0]).join('') 
  return (
      <Avatar className="w-12 h-12 text-gray-700">
        <AvatarFallback>{first_letter}</AvatarFallback>
      </Avatar>
  );
};
