import React from "react";
import { MemberList } from "./components/MemberList";
import { getMembers } from "@/app/member/actions/getMembers";

const Page = async () => {
  const { data, success } = await getMembers();

  return (
    <div className="p-8">
      <MemberList data={data} success={success} />
    </div>
  );
};

export default Page;
