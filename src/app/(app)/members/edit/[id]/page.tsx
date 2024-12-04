import React from "react";
import { MemberFormBuilder } from "../../components/MemberFormBuilder";
import { getUserById } from "../../actions/get-user-by-id";
import {  InfoMemberHeader } from "../../components/EditMemberHeader";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";

type Parameters = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Parameters) => {
  const { id } = params;

  const breadcrumbs: Breadcrumbs[] = [
    { href: Routes.Members, label: "Members" },
    { href: `${Routes.EditMember}/${id}`, label: "Edit Member" },
  ];
  const member = await getUserById(id);

  return (
    <div className="flex flex-col ">
      <InfoMemberHeader breadcrumbs={breadcrumbs} />
      <MemberFormBuilder member={member} />
    </div>
  );
};

export default Page;
