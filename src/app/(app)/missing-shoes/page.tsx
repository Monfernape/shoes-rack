import React from "react";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";
import { MissingShoesHeader } from "./components/MissingShoesHeader";
import { MissingShoes } from "./components/MissingShoes";
import { getAllMissingShoesReport } from "./actions/get-all-missing-shoes";

const Page = async() => {
  const {missingShoesReports , error} = await getAllMissingShoesReport();
  const breadcrumbs = [
    { href: Routes.MissingShoes, label: "Missing shoes" },
    { href: Routes.EditMissingShoes, label: "Edit shoe" },
  ];
  return (
    <div>
      <MissingShoesHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <MissingShoes missingShoesReports={missingShoesReports}  error={error}/>
      </PageLayout>
    </div>
  );
};

export default Page;
