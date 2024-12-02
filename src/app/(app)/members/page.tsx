import React, { Suspense } from "react";
import { MemberList } from "./components/MemberList";
import { MemberHeader } from "./components/MemberHeader";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = () => {
  return (
    <Suspense>
      <MemberHeader />
      <PageLayout>
        <MemberList />
      </PageLayout>
    </Suspense>
  );
};

export default Page;
