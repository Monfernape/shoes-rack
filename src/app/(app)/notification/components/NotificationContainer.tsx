"use client";
import React, { useMemo, useState } from "react";
import { ArrowLeft, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import { Notifications, UserDetails } from "@/types";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { deleteNotification } from "../actions/delete-notification";
import { NotificationType, UserStatus } from "@/constant/constant";
import { ConfirmationModal } from "@/common/ConfirmationModal/ConfirmationModal";

// Later we will get it from api
export const NotificationContainer = ({
  user,
  notificationDetail,
  notificationId,
}: {
  user: UserDetails;
  notificationDetail: Notifications;
  notificationId: string | null;
}) => {
  const pathname = usePathname();
  const formattedDate =
    moment(notificationDetail?.created_at).utc().format("YYYY-MM-DD") +
    " 00:00:00.000000+00";
  const encodedDate = encodeURIComponent(formattedDate);
  const router = useRouter();
  const [modalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigator = useMemo(() => {
    switch (notificationDetail?.type) {
      case NotificationType.Attendance:
        return {
          title: `${Routes.Digest}/?date=${new Date(
            String(notificationDetail?.created_at)
          ).getTime()}`,
          href: `${Routes.Digest}?date=${encodedDate}`,
        };
      case NotificationType.MonthlyReport:
        return {
          title: `${Routes.AttendanceReport}/?date=${new Date(
            String(notificationDetail?.created_at)
          ).getTime()}`,
          href: `${Routes.AttendanceReport}?date=${encodedDate}`,
        };
      default:
        return {
          title: `${Routes.Members}`,
          href: `${Routes.Members}`,
        };
    }
  }, [notificationDetail]);

  const handleDeleteNotification = (notificationId: number) => {
    return deleteNotification(notificationId);
  };
  const handleBackNavigation = () => {
    router.back();
  };
  return (
    <div className="flex flex-1 h-full flex-col">
      <div className="h-16 flex justify-between items-center border-b p-4 ">
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleBackNavigation}
            variant={"outline"}
            className="border-none shadow-none  w-2 lg:hidden"
          >
            <ArrowLeft size={12} />
          </Button>
          <p>Title</p>
        </div>
        {pathname !== Routes.Notification && (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant={"outline"}
              className="text-status-inactive hover:text-status-inactive"
            >
              <div className="flex gap-2 items-center justify-center">
                <TrashIcon />
                <h4 className="font-medium text-sm"> Delete Notification</h4>
              </div>
            </Button>
          </div>
        )}
      </div>
      <div className="p-8 flex flex-col gap-2">
        <h4 className="font-medium text-sm ">Dear {user?.name}</h4>
        <p className="text-sm text-justify">
          {notificationDetail?.description}
        </p>
        <div className="flex  items-center flex-col gap-2 ">
          <span className="text-sm"> Go to following link: &nbsp;</span>
          <Link
            href={`${navigator.href}`}
            className="text-sm font-medium text-blue-500"
          >
            {`${navigator.title}`}
          </Link>
        </div>
      </div>
      <ConfirmationModal
        title={"Delete Notification"}
        description={"Are you sure you want to delete this notification?"}
        buttonText={"Delete"}
        setIsModalOpen={setIsModalOpen}
        onHandleConfirm={() => handleDeleteNotification(Number(notificationId))}
        isModalOpen={modalOpen}
      />
    </div>
  );
};
