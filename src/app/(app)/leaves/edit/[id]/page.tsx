import React from "react";
import { LeaveRequestFormBuilder } from "../../add/components/LeaveRequestFormBuilder";
import { getLeaveRequestById } from "../../actions/get-leave-request-by-id";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const leaves = await getLeaveRequestById(Number(id));
  return <LeaveRequestFormBuilder leaves={leaves} />;
};

export default Page;
