import React from "react";
import { AttendanceList } from "./components/AttendanceList";
import { getAttendance } from "./actions/getAttendance";
import { PageLayout } from "@/app/layout/PageLayout";
import { AttendanceHeader } from "./components/AttendanceHeader";
import { Routes } from "@/lib/routes";

const page = async () => {
  const attendance = await getAttendance();
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Attendance" },
    { href: Routes.AddAttendance, label: "Review attendance" },
  ];
  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <AttendanceList attendance={attendance} />
      </PageLayout>
    </>
  );
};

export default page;
