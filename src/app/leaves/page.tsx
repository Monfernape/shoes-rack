import React from "react";
import { LeavesRequestList } from "./components/LeavesRequestList";
import { PageLayout } from "../layout/PageLayout";
import { LeavesHeader } from "./components/LeavesHeader";

const Page = () => {
  return (
    <>
      <LeavesHeader />
      <PageLayout>
        <LeavesRequestList />
      </PageLayout>
    </>
  );
};

export default Page;
