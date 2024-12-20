import React from "react";
import { FundFormBuilder } from "../components/FundFormBuilder";
import { Routes } from "@/lib/routes";
import { FundHeader } from "../components/FundHeader";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const Page = async() => {
  const loginUser = await getLoggedInUser();
  const breadcrumbs = [
    { href: Routes.Fund, label: "Funds" },
    { href: Routes.AddFund, label: "New Fund" },
  ];
  return (
    <>
      <FundHeader breadcrumbs={breadcrumbs} />
      <FundFormBuilder loginUser={loginUser}/>
    </>
  );
};

export default Page;
