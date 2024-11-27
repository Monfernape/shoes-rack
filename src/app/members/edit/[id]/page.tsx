import React from "react";
import { MemberFormBuilder } from "../../components/MemberFormBuilder";
import { getUserById } from "../../actions/get-user-by-id";

type Parameters = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Parameters) => {
  const { id } = params;
  const member = await getUserById(id);
  return <MemberFormBuilder member={member} />;
};

export default Page;
