import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { MemberDetails } from "@/app/(app)/members/components/MemberDetails";
import { getUserById } from "@/app/(app)/members/actions/get-user-by-id";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { MemberHeader } from "../../components/MemberHeader";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

type Parameters = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Parameters) => {
  const { id } = params;
  const user = await getLoggedInUser()
  const breadcrumbs: Breadcrumbs[] = [
    { href: Routes.Members, label: "Members" },
    { href: `${Routes.MemberDetails}/${id}`, label: "Member details" },
  ];
  const userInfo = await getUserById(id);
  return (
    <div>
      <MemberHeader  breadcrumbs={breadcrumbs} user = {user} />
      <FormWrapper>
        <MemberDetails userInfo={userInfo} />
      </FormWrapper>
    </div>
  );
};

export default Page;
