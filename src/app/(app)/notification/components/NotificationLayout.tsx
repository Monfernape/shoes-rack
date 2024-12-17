"use client";
import React from "react";
import {
  Search as SearchIcon,
  Dot as DotIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { Notifications } from "@/types";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
type NotificationLayoutProps = {
  children: React.ReactNode;
  allnotification: Notifications[];
};
export default function NotificationLayout({
  children,
  allnotification,
}: NotificationLayoutProps) {
  const pathname = usePathname();
  const notificationId = pathname.split("/")[2];
  const handleNotificationStatus = () => {
    return;
  };

  return (
    <div className="flex  h-full ">
      <div className="w-96  border-r h-full ">
        <div className="flex justify-between items-center h-16 p-4 border-b">
          <h4 className="font-medium text-sm flex items-center">
            Notifications
          </h4>
          <div className="flex justify-end gap-1 items-center">
            <Button variant={"outline"} className="w-8 h-8">
              <SearchIcon />
            </Button>
          </div>
        </div>
        <ul className="text-gray-700  ">
          {allnotification?.map((notification) => {
            return (
              <li className=" border-b " key={notification.id}>
                <Link
                  onClick={() => {
                    handleNotificationStatus();
                  }}
                  key={notification.id}
                  className={` flex items-center  hover:bg-gray-100 px-5 py-3 text-xs ${
                    Number(notificationId) === notification.id &&
                    "bg-sidebar-active"
                  }  `}
                  href={`${Routes.Notification}/${notification.id}`}
                >
                  <div className="flex   w-full gap-2">
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-normal text-sm ">
                          {notification.title}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center justify-center flex-1">
                        <div className="bg-gray-200 rounded text-white flex justify-center items-center">
                          <span className="text-xs font-bold p-1 w-8 text-pretty  text-center rounded">
                            CN
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs text-pretty flex-1">
                          Notification send by the system
                        </p>
                      </div>
                    </div>
                    <div className="flex align-middle items-center flex-col">
                      <div className="min-w-8 h-8 ">
                        {notification.is_read && (
                          <DotIcon className="w-8 h-auto mt-[-6px]" />
                        )}
                      </div>
                      <p className="mt-[-8px]">
                        {format(notification.created_at, "P")}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
