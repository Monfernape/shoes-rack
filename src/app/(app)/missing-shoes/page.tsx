import React from "react";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";

import { getAllMissingShoesReport } from "./actions/get-all-missing-shoes";
import { MissingShoes } from "./components/MissingShoes";
import { MissingShoesHeader } from "./components/MissingShoesHeader";

const Page = async({ searchParams }: { searchParams: { key: string } }) => {
  const { key } = searchParams || {};

  const {missingShoesReports , error} = await getAllMissingShoesReport({searchQuery : key});
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
