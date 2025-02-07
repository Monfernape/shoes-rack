import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { AttendanceHeader } from "../attendance/components/AttendanceHeader";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";
import { getDigest } from "./actions/get-digest";
import { Digest } from "./components/Digest";

const Page = async ({ searchParams }: { searchParams: { date: string } }) => {
  const loginUser = await getLoggedInUser();
  const digestData = await getDigest(new Date(searchParams.date));

  const breadcrumbs = [
    { href: Routes.Attendance, label: "Digest" },
    { href: Routes.Digest, label: "Digest Reviews" },
  ];

  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <Digest loginUser={loginUser} digest={digestData} />
      </PageLayout>
    </>
  );
};

export default Page;
