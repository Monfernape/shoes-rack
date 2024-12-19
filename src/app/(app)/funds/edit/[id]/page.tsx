import React from "react";
import { Routes } from "@/lib/routes";
import { getFundDetailsById } from "../../actions/get-fund-by-id";
import { FundFormBuilder } from "../../components/FundFormBuilder";
import { FundHeader } from "../../components/FundHeader";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const funds = await getFundDetailsById(Number(id));

  const breadcrumbs = [
    { href: Routes.Fund, label: "Funds" },
    { href: `${Routes.EditFund}/${id}`, label: "Edit fund" },
  ];

  return (
    <>
      <FundHeader breadcrumbs={breadcrumbs} />
      <FundFormBuilder funds={funds}/>
    </>
  );
};

export default Page;
