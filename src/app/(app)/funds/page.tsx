import React from "react";
import { FundsList } from "./components/FundsList";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { FundsHeader } from "./components/FundsHeader";

const breadcrumbs = [
  { href: Routes.Fund, label: "Funds" },
  { href: Routes.AddFund, label: "Add Fund" },
];
const page = async () => {
  const user = await getLoggedInUser();
  return (
    <>
      <FundsHeader breadcrumbs={breadcrumbs} user={user} />
      <FundsList />
    </>
  );
};

export default page;
