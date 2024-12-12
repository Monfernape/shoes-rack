"use client";
import { Search as SearchIcon, Trash as TrashIcon,Dot as DotIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";

type NotificationLayoutProps = {
  children: React.ReactNode;
  notificationDetails?: {
    id: number;
    memberId: number;
    title: string;
    isRead: boolean;
    path: string;
  }[];
};
export const NotificationLayout = ({
  children,
  notificationDetails,
}: NotificationLayoutProps) => {

  return (
    <div className="flex  h-full ">
      <div className="w-72  border-r h-full ">
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
          {notificationDetails?.map((notification) => (
            <li className=" border-b ">
              <Link
                key  = {notification.id}
                className={` flex items-center justify-center hover:bg-gray-100 px-2 py-2 text-xs  `}
                href={`${Routes.Notification}?notificationid=${notification.id}`}
              >
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <p className="font-normal text-sm ">
                        {notification.title}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center justify-center flex-1">
                      <div className="bg-gray-200 rounded text-white flex justify-center items-center">
                        <span className="text-xs font-bold p-1 text-pretty">
                          CV
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs text-pretty">
                        Muhammad Ali send report to you
                      </p>
                    </div>
                  </div>
                  <div className="flex align-middle items-center flex-col mt-[-2px]">
                    {notification.isRead && <DotIcon className="w-6 h-auto" />}
                    <p className="">1y</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-16 flex justify-between items-center border-b p-4  ">
          <div className=" flex items-center">Notification</div>
          <div className="flex gap-2">
            <Button variant={"outline"} className="text-status-inactive">
              <div className="flex gap-2 items-center justify-center">
                <TrashIcon />
                <h4 className="font-medium text-sm"> Delete Notification</h4>
              </div>
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
