import React from "react";
import { FundsList } from "./components/FundsList";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { FundsHeader } from "./components/FundsHeader";
import { Fund } from "@/types";
import { MemberRole } from "@/constant/constant";
import { MemberDetails } from "../members/components/MemberDetails";

const breadcrumbs = [
  { href: Routes.Fund, label: "Funds" },
  { href: Routes.AddFund, label: "Add Fund" },
];
const funds: Fund[] = [
  {
    id: 1,
    name: "Ali",
    amount: 300,
    created_at: new Date(),
    member_id:2,
    role:MemberRole.Incharge,

  },
  {
    id: 2,
    name: "Bilal",
    amount: 100,
    created_at: new Date(),
    member_id:3,
    role:MemberRole.Member,

  },
  {
    id: 3,
    name: "Javed",
    amount: 500,
    created_at: new Date(),
    member_id:4,
    role:MemberRole.Incharge,

  },
  {
    id: 4,
    name: "Khalid",
    amount: 200,
    created_at: new Date(),
    member_id:5,
    role:MemberRole.Member
    
  },
];

const page = async () => {
  const user = await getLoggedInUser();
  return (
    <>
      <FundsHeader breadcrumbs={breadcrumbs} user={user} />
      <FundsList funds = {funds} />
    </>
  );
};

export default page;
