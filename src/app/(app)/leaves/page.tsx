"use server";
import React from "react";
import { LeavesRequestList } from "./components/LeavesRequestList";
import { LeavesHeader } from "./components/LeavesHeader";
import { PageLayout } from "@/app/layout/PageLayout";
import { getAllLeaveRequests } from "./actions/get-all-leave-requests";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberFilter } from "@/common/Filter/MemberFilter";

const Page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = searchParams || {};

  const loginUser = await getLoggedInUser();
  const leaves = await getAllLeaveRequests(Number(id));

  const breadcrumbs = [
    { href: Routes.LeaveRequest, label: "Leaves" },
    { href: Routes.AddLeaveRequest, label: "New leave request" },
  ];
  return (
    <>
      <LeavesHeader breadcrumbs={breadcrumbs} />
      <MemberFilter loginUser={loginUser} route={Routes.LeaveRequest} />
      <PageLayout>
        <LeavesRequestList leaves={leaves} loginUser={loginUser} />
      </PageLayout>
    </>
  );
};

export default Page;
