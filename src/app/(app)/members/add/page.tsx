import { MemberFormBuilder } from "@/app/members/components/MemberFormBuilder";
import React from "react";
import { MemberHeader } from "../components/MemberHeader";

const Page = () => {
  return (
    <div>
      <MemberHeader />
      <MemberFormBuilder />
    </div>
  );
};

export default Page;
