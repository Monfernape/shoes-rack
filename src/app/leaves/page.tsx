import React from "react";
import { LeavesRequestList } from "./components/LeavesRequestList";
import { PageLayout } from "../layout/PageLayout";

const Page = () => {
  return (
    <PageLayout>
      <LeavesRequestList />
    </PageLayout>
  );
};

export default Page;
