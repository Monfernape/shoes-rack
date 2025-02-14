import React from "react";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { getNotificationsCount } from "./actions/get-notifications-count";
import { Inbox } from "lucide-react";

const breadcrumbs: Breadcrumbs[] = [
  { href: Routes.Notification, label: "Notification" },
];

const Page = async () => {
  const countNotifications = await getNotificationsCount();
  const standarPageProps = {
    title: "Notification",
    description: `There are ${countNotifications} unread Notifications `,
    actionButton: false,
    icon: <Inbox />,
    hasContent: false,
  };
  return (
    <div className="hidden lg:flex h-full  flex-col ">
      <HeaderWrapper breadcrumbs={breadcrumbs} />
      <div className="h-full flex-1">
        <StandardPage {...standarPageProps} />
      </div>
    </div>
  );
};
export default Page;
