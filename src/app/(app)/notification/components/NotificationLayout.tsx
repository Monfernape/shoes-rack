"use client";
import React from "react";
import { Dot as DotIcon } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import { Notifications } from "@/types";
import { formatDistance } from "date-fns";
import { usePathname } from "next/navigation";
import { updateNotificationStatus } from "../actions/update-notification-status";
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
  const handleNotificationStatus = async (id: number) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="flex  h-full ">
      <div
        className={`w-full  lg:w-96  border-r h-full ${
          notificationId && "hidden lg:block"
        } `}
      >
        <div className="flex   items-center h-16 py-4 px-5 border-b">
          <h4 className="font-medium text-sm text-center flex items-center">
            Notifications
          </h4>
        </div>
        <ul className="text-gray-700  ">
          {allnotification?.map((notification) => {
            return (
              <li className=" border-b " key={notification.id}>
                <Link
                  onClick={() => {
                    handleNotificationStatus(notification.id);
                  }}
                  key={notification.id}
                  className={` flex items-center  hover:bg-gray-100 px-5 py-3 text-xs ${
                    Number(notificationId) === notification.id &&
                    "bg-sidebar-active"
                  }  `}
                  href={`${Routes.Notification}/${notification.id}`}
                >
                  <div className="flex   w-full gap-2">
                    <div className="flex flex-col gap-1">
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
                    <div className="flex align-middle items-center flex-col flex-1">
                      <div className="min-w-8 h-8 ">
                        {!notification.is_read && (
                          <DotIcon className="w-8 h-auto mt-[-8px]" />
                        )}
                      </div>
                      <p className="mt-[-8px]">
                        {formatDistance(Date.now(), notification.created_at)}
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
