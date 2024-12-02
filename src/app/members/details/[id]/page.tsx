import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { MemberDetails } from "@/app/(app)/members/components/MemberDetails";
import { getUserById } from "@/app/(app)/members/actions/get-user-by-id";

type Parameters = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Parameters) => {
  const { id } = params;
  const userInfo = await getUserById(id);
  return (
    <div className="p-8">
      <FormWrapper>
        <MemberDetails userInfo={userInfo} />
      </FormWrapper>
    </div>
  );
};

export default Page;
