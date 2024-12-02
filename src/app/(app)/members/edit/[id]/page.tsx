import React from "react";
import { MemberFormBuilder } from "../../components/MemberFormBuilder";
import { getUserById } from "../../actions/get-user-by-id";
import { EditMemberHeader } from "../../components/EditMemberHeader";

type Parameters = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Parameters) => {
  const { id } = params;

  const member = await getUserById(id);

  return (
    <>
      <EditMemberHeader id={id}/>
      <MemberFormBuilder member={member} />
    </>
  );
};

export default Page;
