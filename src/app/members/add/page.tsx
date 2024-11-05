import { MemberFormBuilder } from "@/app/members/components/MemberFormBuilder";
import React from "react";
import { MemeberHeader } from "../components/MemeberHeader";

const Page = () => {
  return (
    <div>
      <MemeberHeader />
      <MemberFormBuilder />
    </div>
  );
};

export default Page;
