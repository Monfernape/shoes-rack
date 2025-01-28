import React from "react";
import { AttendanceList } from "./components/AttendanceList";
import { getAttendance } from "./actions/getAttendance";
import { PageLayout } from "@/app/layout/PageLayout";
import { AttendanceHeader } from "./components/AttendanceHeader";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberFilter } from "@/common/Filter/MemberFilter";
const breadcrumbs = [
  { href: Routes.Attendance, label: "Attendance" },
  { href: Routes.AddAttendance, label: "Review attendance" },
];

const Page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = searchParams || {};
  const attendance = await getAttendance(Number(id));
  const loginUser = await getLoggedInUser();
  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <MemberFilter loginUser={loginUser}  route={Routes.Attendance}/>
      <PageLayout>
        <AttendanceList attendance={attendance} loginUser={loginUser} />
      </PageLayout>
    </>
  );
};

export default Page;
