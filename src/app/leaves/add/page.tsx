import React from "react";
import { getMembers } from "../../members/actions/getMembers";
import { LeaveRequestFormBuilder } from "./components/LeaveRequestFormBuilder";

const page = async () => {
  const members = await getMembers();
  return <LeaveRequestFormBuilder members={members} />;
};

export default page;
