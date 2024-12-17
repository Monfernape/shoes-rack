import NotificationLayout from "./components/NotificationLayout";
import { NotificationType } from "@/constant/constant";

const notifications = [
  {
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
  },
  {
    id: 2,
    member_id: 2,
    is_read: true,
    title: "Leave list update",
    sender_id: null,
    system_generated: true,
    description:
      "Please approve the leave records for [specific department/team] at your earliest convenience ",
    created_at: new Date(Date.now()),
    type: NotificationType.Leave,
    members: null,
  },
  {
    id: 3,
    member_id: 3,
    is_read: true,
    title: "Missing shoes update",
    sender_id: null,
    system_generated: true,
    description:
      "Please approve the missing shoes records for [specific department/team] at your earliest convenience ",
    created_at: new Date(Date.now()),
    type: NotificationType.MissingShoes,
    members: null,
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NotificationLayout allnotification={notifications}>
        {children}
      </NotificationLayout>
    </>
  );
}
