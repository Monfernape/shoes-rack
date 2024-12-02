import React from "react";
import { LeaveRequestFormBuilder } from "./components/LeaveRequestFormBuilder";
import { LeavesHeader } from "../components/LeavesHeader";

const Page = async () => {
  return (
    <>
      <LeavesHeader />
      <LeaveRequestFormBuilder />
    </>
  );
};

export default Page;
