"use server";
import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { LeavesHeader } from "../../components/LeavesHeader";
import { getLeaveRequestById } from "../../actions/get-leave-request-by-id";
import { LeaveRequestDetails } from "../../components/LeaveRequestDetails";
import { getUserById } from "@/app/(app)/members/actions/get-user-by-id";
import { permanentRedirect } from "next/navigation";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberRole } from "@/constant/constant";
type Parameters = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Parameters) => {
  const { id: requestId } = params;
  const leaveRequest = await getLeaveRequestById(Number(requestId));
  const userInfo = await getUserById(leaveRequest.memberId);
  const loginUser = await getLoggedInUser();
  if (
    leaveRequest.memberId !== loginUser.id &&
    loginUser.role === MemberRole.Member
  ) {
    permanentRedirect(Routes.LeaveRequest);
  }
  const breadcrumbs: Breadcrumbs[] = [
    { href: Routes.LeaveRequest, label: "Leaves" },
    {
      href: `${Routes.LeaveRequestDetails}/${requestId}`,
      label: userInfo?.name,
    },
  ];
  return (
    <div>
      <LeavesHeader breadcrumbs={breadcrumbs} />
      <FormWrapper>
        <LeaveRequestDetails
          leaveRequestDetails={leaveRequest}
          leaveRequestedBy={userInfo?.name}
        />
      </FormWrapper>
    </div>
  );
};
export default Page;