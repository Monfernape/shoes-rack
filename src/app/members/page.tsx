import React from "react";
import { MemberList } from "./components/MemberList";
import { PageLayout } from "../layout/PageLayout";
import { MemeberHeader } from "./components/MemeberHeader";
import { getMembers } from "./actions/getMembers";
const Page = async () => {
  const { data, error } = await getMembers();

  return (
    <div>
      <MemeberHeader />
      <PageLayout>
      <MemberList data={data} error={error?.message} />
      </PageLayout>
    </div>
  );
};

export default Page;
