import React from "react";
import { MemberList } from "./components/MemberList";
import { MemberHeader } from "./components/MemberHeader";
import { PageLayout } from "@/app/layout/PageLayout";
import { getMembers } from "./actions/getMembers";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const breadcrumbs: Breadcrumbs[] = [{ href: Routes.Members, label: "Members" }];

const Page = async () => {
  const user = await getLoggedInUser();
  const { data: members } = await getMembers("");

  
  return (
    <>
      <MemberHeader breadcrumbs={breadcrumbs} user = {user} />
      <PageLayout>
        <MemberList members={members} user={user} />
      </PageLayout>
    </>
  );
};

export default Page;
