import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { Settings } from "./components/Settings";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = async () => {
  const loginUser = await getLoggedInUser();
  return (
    <PageLayout>
      <Settings loginUser={loginUser} />;
    </PageLayout>
  );
};

export default Page;
