"use client";
import { useUser } from "@/hooks/useGetLoggedinUser";
import React from "react";
export const AlertBar = () => {
  const loggedInUser = useUser();
  if (loggedInUser?.temporary_password) {
    return <></>;
  }
  return (
    <div className="flex w-full bg-[#01160d] h-10 text-white text-sm items-center justify-center z-[999] sticky top-0">
      Please update your password
    </div>
  );
};
