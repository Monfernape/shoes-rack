import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { DigestReviews } from "./components/DigestReviews";
import { AttendanceHeader } from "../components/AttendanceHeader";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";
import { getDigest } from "./actions/get-digest";

const Page = async ({ searchParams }: { searchParams: { date: string }}) => {

  const loginUser = await getLoggedInUser();
  const digestData = await getDigest((new Date(searchParams.date))); 
  
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Digest" },
    { href: Routes.MarkAttendance, label: "Digest Reviews" },
  ];

  if(!digestData) return null;
  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
      <DigestReviews loginUser={loginUser} digest={digestData}/>
    </PageLayout>
    </>
  );
};

export default Page;
