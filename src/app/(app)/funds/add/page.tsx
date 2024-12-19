import React from "react";
import { FundFormBuilder } from "../components/FundFormBuilder";
import { Routes } from "@/lib/routes";
import { FundHeader } from "../components/FundHeader";

const Page = () => {
  const breadcrumbs = [
    { href: Routes.Fund, label: "Funds" },
    { href: Routes.AddFund, label: "New Fund" },
  ];
  return (
    <>
      <FundHeader breadcrumbs={breadcrumbs} />
      <FundFormBuilder />
    </>
  );
};

export default Page;
