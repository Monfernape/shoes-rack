"use client";
import React from "react";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import { Notifications, UserDetails } from "@/types";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

// Later we will get it from api
export const NotificationContainer = ({
  user,
  notificationDetail,
  notificationId,
}: {
  user: UserDetails;
  notificationDetail: Notifications | undefined;
  notificationId: string | null;
}) => {
  const pathname = usePathname();

  const handleNotification = (notificationId: number) => {
    return notificationId;
  };

  return (
    <div className="flex flex-1 h-full flex-col">
      <div className="h-16 flex justify-between items-center border-b p-4 px-8  ">
        <div className=" flex items-center">Title</div>
        {pathname !== Routes.Notification && (
          <div className="flex gap-2">
            <Button
              onClick={() => handleNotification(Number(notificationId))}
              variant={"outline"}
              className="text-status-inactive hover:text-status-inactive"
            >
              <div className="flex gap-2 items-center justify-center">
                <TrashIcon />
                <h4 className="font-medium text-sm"> Delete Notification</h4>
              </div>
            </Button>
          </div>
        )}
      </div>
      <div className="p-8 flex flex-col gap-2">
        <h4 className="font-medium text-sm ">Dear {user?.name}</h4>
        <p className="text-sm text-justify">
          {notificationDetail?.description}
        </p>
        <div className="flex  items-center ">
          <span className="text-sm"> Go to following link: &nbsp;</span>
          <Link
            href={Routes.Attendance}
            className="text-sm font-medium text-blue-500"
          >
            `${Routes.Attendance}`
          </Link>
        </div>
      </div>
    </div>
  );
};