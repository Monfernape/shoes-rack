import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { AttendanceReview } from "./components/AttendanceReview";
import { AttendanceHeader } from "../components/AttendanceHeader";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = async () => {
  const loginUser = await getLoggedInUser();
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Attendance" },
    { href: Routes.MarkAttendance, label: "Review Attendance" },
  ];
  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
      <div>
        <h4 className="text-xs text-gray-700 mb-6">Attendance digest for <b>Shift A</b> dated <b>09/01/2025</b></h4>
      </div>
      <AttendanceReview loginUser={loginUser} />
    </PageLayout>
    </>
  );
};

export default Page;
