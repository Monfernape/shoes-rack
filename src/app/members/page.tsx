import React from "react";
import { MemberList } from "./components/MemberList";
import { PageLayout } from "../layout/PageLayout";
import { MemeberHeader } from "./components/MemeberHeader";
import { getMembers } from "./actions/getMembers";
const Page = async () => {
  const members = await getMembers();

  return (
    <>
      <MemeberHeader />
      <PageLayout>
        <MemberList members={members} />
      </PageLayout>
    </>
  );
};

export default Page;
