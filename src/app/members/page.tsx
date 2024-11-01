import React from "react";
import { MemberList } from "./components/MemberList";
import { PageLayout } from "../layout/PageLayout";
import { MemeberHeader } from "./components/MemeberHeader";
import { getMembers } from "./actions/getMembers";
const Page = async () => {
  const { data, success , message } = await getMembers();

  return (
    <div>
      <MemeberHeader />
      <PageLayout>
      <MemberList data={data} success={success} message={message} />
      </PageLayout>
    </div>
  );
};

export default Page;
