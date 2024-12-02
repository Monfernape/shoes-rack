import React, { Suspense } from "react";
import { LeavesRequestList } from "./components/LeavesRequestList";
import { LeavesHeader } from "./components/LeavesHeader";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = () => {
  return (
    <Suspense>
      <LeavesHeader />
      <PageLayout>
        <LeavesRequestList />
      </PageLayout>
    </Suspense>
  );
};

export default Page;
