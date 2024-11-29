import React from "react";
import { MemberDetails } from "../../components/MemberDetails";
import { getUserById } from "../../actions/get-user-by-id";
import FormWrapper from "@/common/FormWrapper";

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
     <FormWrapper><MemberDetails userInfo={userInfo} /></FormWrapper>  
    </div>
  );
};

export default Page;
