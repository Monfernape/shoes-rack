import React from "react";
import { LeaveRequestFormBuilder } from "./components/LeaveRequestFormBuilder";
import { LeavesHeader } from "../components/LeavesHeader";

const page = async () => {
  return (
    <>
      <LeavesHeader />
      <LeaveRequestFormBuilder />
    </>
  );
};

export default page;
