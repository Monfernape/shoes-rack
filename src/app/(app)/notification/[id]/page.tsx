import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { NotificationContainer } from "../components/NotificationContainer";
import { getNotificationById } from "../actions/get-notification-by-id";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getLoggedInUser();
  const notificationDetail = await getNotificationById(Number(id));
  return (
    <NotificationContainer
      notificationId={id}
      notificationDetail={notificationDetail}
      user={user}
    />
  );
};
export default Page;
