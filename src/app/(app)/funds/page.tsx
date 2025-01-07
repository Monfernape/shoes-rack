import React from "react";
import { FundsList } from "./components/FundsList";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { FundsHeader } from "./components/FundsHeader";
import { getAllFunds } from "./actions/get-all-funds";
import { UserStatus } from "@/constant/constant";

const breadcrumbs = [
  { href: Routes.Fund, label: "Funds" },
  { href: Routes.AddFund, label: "Add Fund" },
];

const Page = async () => {
  const user = await getLoggedInUser();
  const funds = await getAllFunds();

  const fundUpdated = funds
    .map((fund) => {
      const activeMember = fund.members.status !== UserStatus.Deactivated;

      if (activeMember) {
        const { name, role } = fund.members;
        return {
          ...fund,
          name,
          role,
        };
      }
    })
    .filter(Boolean);

  return (
    <>
      <FundsHeader breadcrumbs={breadcrumbs} user={user} />
      <FundsList funds={fundUpdated} />
    </>
  );
};

export default Page;
