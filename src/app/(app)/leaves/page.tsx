import React  from "react";
import { LeavesRequestList } from "./components/LeavesRequestList";
import { LeavesHeader } from "./components/LeavesHeader";
import { PageLayout } from "@/app/layout/PageLayout";

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
