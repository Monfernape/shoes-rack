import React from "react";
import { permanentRedirect } from "next/navigation";
import { LeaveRequestFormBuilder } from "../../add/components/LeaveRequestFormBuilder";
import { getLeaveRequestById } from "../../actions/get-leave-request-by-id";
import { LeavesHeader } from "../../components/LeavesHeader";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const loginUser = await getLoggedInUser();

  const leaves = await getLeaveRequestById(Number(id));

  if ( leaves.memberId !== loginUser.id) {
    permanentRedirect(Routes.LeaveRequest);
  }

  const breadcrumbs = [
    { href: Routes.LeaveRequest, label: "Leaves" },
    { href: `${Routes.EditLeaveRequest}/${id}`, label: "Edit Leave Request" },
  ];

  return (
    <>
      <LeavesHeader breadcrumbs={breadcrumbs} />
      <LeaveRequestFormBuilder leaves={leaves} loginUser={loginUser} />
    </>
  );
};

export default Page;
