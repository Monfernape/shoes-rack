import React from "react";
import { MemberList } from "./components/MemberList";
import { PageLayout } from "../layout/PageLayout";
import { MemberHeader } from "./components/MemberHeader";

const Page = async () => {
  return (
    <>
      <MemberHeader />
      <PageLayout>
        <MemberList />
      </PageLayout>
    </>
  );
};

export default Page;
