import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { AttendanceReview } from "../components/CurrentAttendance";
import { AttendanceHeader } from "../components/AttendanceHeader";
import { Routes } from "@/lib/routes";

const Page = async () => {
  const loginUser = await getLoggedInUser();
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Attendance" },
    { href: Routes.MarkAttendance, label: "Mark Attendance" },
  ];
  return (
    <div>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <AttendanceReview loginUser={loginUser} />
    </div>
  );
};

export default Page;
