import React from "react";
import { LeaveRequestFormBuilder } from "./components/LeaveRequestFormBuilder";
import { LeavesHeader } from "../components/LeavesHeader";
import { Routes } from "@/lib/routes";

const Page = async () => {
  const breadcrumbs = [
    { href: Routes.LeaveRequest, label: "Leaves" },
    { href: `${Routes.AddLeaveRequest}`, label: "New Leave Request" },
  ];
  return (
    <>
      <LeavesHeader breadcrumbs={breadcrumbs}/>
      <LeaveRequestFormBuilder />
    </>
  );
};

export default Page;
