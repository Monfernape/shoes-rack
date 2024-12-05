import React from "react";
import { MemberFormBuilder } from "../../components/MemberFormBuilder";
import { getUserById } from "../../actions/get-user-by-id";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberHeader } from "../../components/MemberHeader";

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
    { href: `${Routes.EditMember}/${id}`, label: "Edit Member" },
  ];
  const member = await getUserById(id);

  return (
    <div className="flex flex-col ">
      <MemberHeader breadcrumbs={breadcrumbs} user = {user} />
      <MemberFormBuilder member={member} user = {user} />
    </div>
  );
};

export default Page;
