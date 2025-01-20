import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { MemberDetails } from "@/app/(app)/members/components/MemberDetails";
import { getUserById } from "@/app/(app)/members/actions/get-user-by-id";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { MemberHeader } from "../../components/MemberHeader";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberRole, UserStatus } from "@/constant/constant";
import { permanentRedirect } from "next/navigation";

type Parameters = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Parameters) => {
  const { id } = params;
  const user = await getLoggedInUser();
  const userInfo = await getUserById(id);
  if (
    user.role === MemberRole.Member &&
    userInfo.status === UserStatus.Deactivated
  ) {
    return permanentRedirect(Routes.Members);
  }
  const breadcrumbs: Breadcrumbs[] = [
    { href: Routes.Members, label: "Members" },
    { href: `${Routes.MemberDetails}/${id}`, label: userInfo.name },
  ];
  return (
    <div>
      <MemberHeader breadcrumbs={breadcrumbs} user={user} />
      <FormWrapper>
        <MemberDetails userInfo={userInfo} user={user} />
      </FormWrapper>
    </div>
  );
};

export default Page;
