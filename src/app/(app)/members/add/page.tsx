
import React from "react";
import { MemberFormBuilder } from "../components/MemberFormBuilder";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberHeader } from "../components/MemberHeader";

const breadcrumbs: Breadcrumbs[] = [
  { href: Routes.Members, label: "Members" },
  { href: `${Routes.AddMember}`, label: "Add Member" },
];

const Page = async () => {
  const user =await  getLoggedInUser()
  return (
    <div>
      <MemberHeader breadcrumbs={breadcrumbs} user = {user}/>
      <MemberFormBuilder user = {user} />
    </div>
  );
};

export default Page;
