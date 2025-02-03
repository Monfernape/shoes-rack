import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { AttendanceReview } from "./components/AttendanceReview";
import { AttendanceHeader } from "../components/AttendanceHeader";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";
import { getDigestById } from "./actions/get-digest-by-id";

const Page = async ({ searchParams }: { searchParams: { date: string }}) => {

  const loginUser = await getLoggedInUser();
  const digestData = await getDigestById(230, (new Date(searchParams.date))); 
  
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Attendance" },
    { href: Routes.MarkAttendance, label: "Review Attendance" },
  ];

  if(!digestData) return null;
  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
      <AttendanceReview loginUser={loginUser} digest={digestData}/>
    </PageLayout>
    </>
  );
};

export default Page;
