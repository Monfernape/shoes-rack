import React from "react";
import { NotificationLayout } from "./components/NotificationLayout";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const notifications = [
  {
    id: 1,
    memberId: 1,
    isRead: true,
    title: "Attendance list update",
    path: `${Routes.Notification}`,
    description:
      "Please approve the attendance records for [specific department/team] at your earliest convenience ",
    created_at: new Date(Date.now()),
  },
  {
    id: 2,
    memberId: 2,
    title: "Leave request update",
    isRead: true,
    path: `${Routes.Notification}`,
    description:
      "Please approve the attendance records for [specific department/team] at your earliest convenience ",
    created_at: new Date(Date.now()),
  },
  {
    id: 3,
    memberId: 3,
    title: "Missing Shoes update",
    isRead: true,
    path: `${Routes.Notification}`,
    description:
      "Please approve the attendance records for [specific department/team] at your earliest convenience ",
    created_at: new Date(Date.now()),
  },
];

const Page = async () => {
  const user = await getLoggedInUser();
  return <NotificationLayout user={user} notifications={notifications} />;
};

export default Page;
