import React from "react";
import { MemberList } from "./components/MemberList";
import { PageLayout } from "../layout/PageLayout";
import { MemeberHeader } from "./components/MemeberHeader";
const Page = () => {
  return (
    <div>
      <MemeberHeader />
      <PageLayout>
        <MemberList />
      </PageLayout>
    </div>
  );
};

export default Page;
