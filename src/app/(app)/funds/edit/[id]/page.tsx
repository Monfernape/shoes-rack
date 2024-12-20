import React from "react";
import { Routes } from "@/lib/routes";
import { getFundDetailsById } from "../../actions/get-fund-by-id";
import { FundFormBuilder } from "../../components/FundFormBuilder";
import { FundHeader } from "../../components/FundHeader";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const loginUser = await getLoggedInUser();
  const funds = await getFundDetailsById(Number(id));

  const breadcrumbs = [
    { href: Routes.Fund, label: "Funds" },
    { href: `${Routes.EditFund}/${id}`, label: "Edit fund" },
  ];

  return (
    <>
      <FundHeader breadcrumbs={breadcrumbs} />
      <FundFormBuilder funds={funds} loginUser={loginUser}/>
    </>
  );
};

export default Page;
