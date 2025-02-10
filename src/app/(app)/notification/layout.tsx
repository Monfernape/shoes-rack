import { getAllNotifications } from "./actions/get-notifications";
import NotificationLayout from "./components/NotificationLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notifications = await getAllNotifications();
  return (
    <>
      <NotificationLayout allnotification={notifications}>
        {children}
      </NotificationLayout>
    </>
  );
}
