import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Routes } from "@/lib/routes";
import { UserDetails } from "@/types";
import { Bell as BellIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const standarPageProps = {
  title: "Notification",
  description: "There are 169 unread Notifications ",
  actionButton: false,
  buttonIcon: <BellIcon />,
};
// Later we will get it from api 
const notificationdetail = {
    description:
      "Please approve the attendance records for [specific department/team] at your earliest convenience ",
    href: Routes.Notification,
  };

export const NotificationContainer = ({ user }: { user: UserDetails }) => {


  return (
    <StandardPage {...standarPageProps}>
      <div className="flex flex-1 h-full">
        <div className="p-8 flex flex-col gap-2">
          <h4 className="font-medium text-sm mb-2 ">Dear {user.name}</h4>
          <p className="text-sm text-justify">
            {notificationdetail.description}
          </p>
          <Link
            href={notificationdetail.href}
            className="text-sm font-medium mx-auto text-blue-500"
          >
            Go To Following Link
          </Link>
        </div>
      </div>
    </StandardPage>
  );
};
