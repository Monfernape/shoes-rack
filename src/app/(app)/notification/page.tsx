import React from "react";
import { NotificationLayout } from "./components/NotificationLayout";
import { Routes } from "@/lib/routes";
import { NotificationContainer } from "./components/NotificationContainer";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const notificationDetails = [
  {
    id: 1,
    memberId: 1,
    isRead: true,
    title: "Attendance list update",
    path: `${Routes.Notification}`,
    description:
      "Please approve the attendance records for [specific department/team] at your earliest convenience ",
  },
  {
    id: 2,
    memberId: 2,
    title: "Leave request update",
    isRead: true,
    path: `${Routes.Notification}`,
    description:
      "Please approve the attendance records for [specific department/team] at your earliest convenience ",
  },
  {
    id: 3,
    memberId: 3,
    title: "Missing Shoes update",
    isRead: true,
    path: `${Routes.Notification}`,
    description:
      "Please approve the attendance records for [specific department/team] at your earliest convenience ",
  },
];

const Page = async () => {
  const user = await getLoggedInUser();
  return (
    <NotificationLayout notificationDetails={notificationDetails}>
      <NotificationContainer user={user} />
    </NotificationLayout>
  );
};

export default Page;
