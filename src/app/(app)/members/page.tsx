import React from "react";
import { MemberList } from "./components/MemberList";
import { MemberHeader } from "./components/MemberHeader";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = () => {
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
