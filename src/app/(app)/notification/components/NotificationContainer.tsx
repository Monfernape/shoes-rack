import React from "react";
import { Bell as BellIcon } from "lucide-react";
import Link from "next/link";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Routes } from "@/lib/routes";
import {UserDetails } from "@/types";

// Later we will get it from api
const notificationdetail = {
  description:
    "Please approve the attendance records for [specific department/team] at your earliest convenience ",
  href: Routes.Notification,

};

export const NotificationContainer = ({
  user,
  notificationId
}: {
  user: UserDetails;
  notificationId:string | null
}) => {
  const standarPageProps = {
    title: "Notification",
    description: "There are 169 unread Notifications ",
    actionButton: false,
    buttonIcon: <BellIcon />,
    hasContent: notificationId ? true : false,
  };

  return (
    <StandardPage {...standarPageProps}>
      <div className="flex flex-1 h-full">
        <div className="p-8 flex flex-col gap-2">
          <h4 className="font-medium text-sm ">Dear {user?.name}</h4>
          <p className="text-sm text-justify">
            {notificationdetail.description}
          </p>
      
        <div className="flex  items-center ">
        <span className="text-sm"> Go to following link: &nbsp;</span>
          <Link
            href={notificationdetail.href}
            className="text-sm font-medium text-blue-500"
          >
      
           {`${process.env.NEXT_PUBLIC_LOCALHOST}${Routes.Attendance}`}
          </Link>
        </div>
         </div>
 
      </div>
    </StandardPage>
  );
};
