"use client";
import { PageLayout } from "@/app/layout/PageLayout";

import React from "react";

import Prfoile from "./profile/components/Profile";

import { getLoggedInUser } from "@/utils/getLoggedInUser";




const Settings = async () => {
  const loginUser = await getLoggedInUser()
  return (
    <PageLayout>
      <div className="flex justify-around items-center">
        <Prfoile loginUser={loginUser} />
      </div>
    </PageLayout>
  );
};

export default Settings;
