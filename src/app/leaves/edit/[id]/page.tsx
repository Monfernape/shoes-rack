import React from "react";
import { LeaveRequestFormBuilder } from "../../add/components/LeaveRequestFormBuilder";
import { getLeaveRequestById } from "../../actions/get-leave-request-by-id";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const leaveRequest = await getLeaveRequestById(Number(id));
  return <LeaveRequestFormBuilder leaveRequest={leaveRequest} />;
};

export default Page;
