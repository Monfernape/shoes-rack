import React from "react";
import { LeaveRequestFormBuilder } from "./components/LeaveRequestFormBuilder";
import { LeavesHeader } from "../components/LeavesHeader";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const Page = async () => {
  const loginUser = await getLoggedInUser();
  const breadcrumbs = [
    { href: Routes.LeaveRequest, label: "Leaves" },
    { href: `${Routes.AddLeaveRequest}`, label: "New leave request" },
  ];
  return (
    <>
      <LeavesHeader breadcrumbs={breadcrumbs}/>
      <LeaveRequestFormBuilder loginUser={loginUser}  />
    </>
  );
};

export default Page;
