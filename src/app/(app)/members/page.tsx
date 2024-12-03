import React, { Suspense } from "react";
import { MemberList } from "./components/MemberList";
import { MemberHeader } from "./components/MemberHeader";
import { PageLayout } from "@/app/layout/PageLayout";
import { getMembers } from "./actions/getMembers";

const Page = async () => {
  const { data: member } =await getMembers("");

  return (
    <Suspense>
      <MemberHeader />
      <PageLayout>
        <MemberList member={member} />
      </PageLayout>
    </Suspense>
  );
};

export default Page;
