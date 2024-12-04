
import React from "react";
import { MemberFormBuilder } from "../components/MemberFormBuilder";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { InfoMemberHeader } from "../components/EditMemberHeader";

const breadcrumbs: Breadcrumbs[] = [
  { href: Routes.Members, label: "Members" },
  { href: `${Routes.AddMember}`, label: "Add Member" },
];

const Page = () => {
  return (
    <div>
      <InfoMemberHeader breadcrumbs={breadcrumbs}/>
      <MemberFormBuilder />
    </div>
  );
};

export default Page;
