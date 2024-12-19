import React from "react";
import { FundsList } from "./components/FundsList";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { FundsHeader } from "./components/FundsHeader";
import { getAllFunds } from "./actions/get-all-funds";

const breadcrumbs = [
  { href: Routes.Fund, label: "Funds" },
  { href: Routes.AddFund, label: "Add Fund" },
];

const page = async () => {
  const user = await getLoggedInUser();
  const funds = await getAllFunds();

  const fundUpdated = funds.map((fund) => {
    const memberName = fund.members.name;
    const role = fund.members.role
    return {
      ...fund,
      name: memberName,
      role
    };
  });
  return (
    <>
      <FundsHeader breadcrumbs={breadcrumbs} user={user} />
      <FundsList  funds={fundUpdated} />
    </>
  );
};

export default page;
