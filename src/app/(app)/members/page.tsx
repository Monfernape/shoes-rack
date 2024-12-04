import React, { Suspense } from "react";
import { MemberList } from "./components/MemberList";
import { MemberHeader } from "./components/MemberHeader";
import { PageLayout } from "@/app/layout/PageLayout";
import { getMembers } from "./actions/getMembers";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";

const breadcrumbs: Breadcrumbs[] = [{ href: Routes.Members, label: "Members" }];

const Page = async () => {
  const { data: member } = await getMembers("");

  return (
    <Suspense>
      <MemberHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <MemberList member={member} />
      </PageLayout>
    </Suspense>
  );
};

export default Page;
