
import React from "react";
import { MemberFormBuilder } from "../components/MemberFormBuilder";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { InfoMemberHeader } from "../components/EditMemberHeader";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const breadcrumbs: Breadcrumbs[] = [
  { href: Routes.Members, label: "Members" },
  { href: `${Routes.AddMember}`, label: "Add Member" },
];

const Page = async () => {
  const user =await  getLoggedInUser()
  return (
    <div>
      <InfoMemberHeader breadcrumbs={breadcrumbs}/>
      <MemberFormBuilder user = {user} />
    </div>
  );
};

export default Page;
