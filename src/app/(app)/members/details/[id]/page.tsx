import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { MemberDetails } from "@/app/(app)/members/components/MemberDetails";
import { getUserById } from "@/app/(app)/members/actions/get-user-by-id";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { InfoMemberHeader } from "../../components/EditMemberHeader";

type Parameters = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Parameters) => {
  const { id } = params;
  const breadcrumbs: Breadcrumbs[] = [
    { href: Routes.Members, label: "Members" },
    { href: `${Routes.MemberDetails}/${id}`, label: "Member details" },
  ];
  const userInfo = await getUserById(id);
  return (
    <div>
      <InfoMemberHeader  breadcrumbs={breadcrumbs} />
      <FormWrapper>
        <MemberDetails userInfo={userInfo} />
      </FormWrapper>
    </div>
  );
};

export default Page;
