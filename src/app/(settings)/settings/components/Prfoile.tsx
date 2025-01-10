"use client";
import { PageLayout } from "@/app/layout/PageLayout";

import React from "react";

import { Member } from "@/types";
import { Settings } from "../page";

const Prfoile = ({ loginUser }: { loginUser: Member }) => {
  return (
    <PageLayout>
      <div className="flex justify-around items-center">
        <Settings loginUser={loginUser} />
      </div>
    </PageLayout>
  );
};

export default Prfoile;
