import React from "react";
import { LeaveRequestFormBuilder } from "../../add/components/LeaveRequestFormBuilder";
import { getLeaveRequestById } from "../../actions/get-leave-request-by-id";
import { LeavesHeader } from "../../components/LeavesHeader";
import { Routes } from "@/lib/routes";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const leaves = await getLeaveRequestById(Number(id));

  const breadcrumbs = [
    { href: Routes.LeaveRequest, label: "Leaves" },
    { href: `${Routes.EditLeaveRequest}/${id}`, label: "Edit Leave Request" },
  ];

  return (
    <>
      <LeavesHeader breadcrumbs={breadcrumbs} />
      <LeaveRequestFormBuilder leaves={leaves} />
    </>
  );
};

export default Page;
