import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { NotificationContainer } from "../components/NotificationContainer";
import { NotificationType } from "@/constant/constant";

const notificationDetail = {
  id: 1,
  member_id: 1,
  is_read: true,
  title: "Attendance list update",
  sender_id: null,
  system_generated: true,
  description:
    "Please approve the attendance records for [specific department/team] at your earliest convenience ",
  created_at: new Date(Date.now()),
  type: NotificationType.Attendance,
  members: null,
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getLoggedInUser();

  return (
    <NotificationContainer
      notificationId={id}
      notificationDetail={notificationDetail}
      user={user}
    />
  );
};
export default Page;
