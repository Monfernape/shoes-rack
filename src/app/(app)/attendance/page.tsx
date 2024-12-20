import React from "react";
import { AttendanceList } from "./components/AttendanceList";
import { getAttendance } from "./actions/getAttendance";
import { PageLayout } from "@/app/layout/PageLayout";
import { AttendanceHeader } from "./components/AttendanceHeader";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { AttendanceFilter } from "@/common/Filter/AttendanceFilter";

const Page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = searchParams || {};
  const attendance = await getAttendance(id);
  const loginUser = await getLoggedInUser();
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Attendance" },
    { href: Routes.AddAttendance, label: "Review attendance" },
  ];
  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <AttendanceFilter loginUser={loginUser} />
      <PageLayout>
        <AttendanceList attendance={attendance} />
      </PageLayout>
    </>
  );
};

export default Page;
