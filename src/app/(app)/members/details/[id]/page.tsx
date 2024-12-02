import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { MemberDetails } from "@/app/(app)/members/components/MemberDetails";
import { getUserById } from "@/app/(app)/members/actions/get-user-by-id";
import { DetailMemberHeader } from "../../components/DetailMemberHeader";

type Parameters = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Parameters) => {
  const { id } = params;
  const userInfo = await getUserById(id);
  return (
    <div >
      <DetailMemberHeader id = {id}/>
      <FormWrapper>
        <MemberDetails userInfo={userInfo} />
      </FormWrapper>
    </div>
  );
};

export default Page;
