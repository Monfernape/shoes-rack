import React from "react";
import { MemberList } from "./components/MemberList";
import { PageLayout } from "../layout/PageLayout";
import { getMembers } from "./actions/getMembers";
import { MemberHeader } from "./components/MemberHeader";
const Page = async () => {
  const members = await getMembers();

  return (
    <>
      <MemberHeader />
      <PageLayout>
        <MemberList members={members} />
      </PageLayout>
    </>
  );
};

export default Page;
