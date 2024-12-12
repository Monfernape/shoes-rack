import React from "react";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";
import { getAllMissingShoes } from "./actions/get-all-missing-shoes";
import { MissingShoesHeader } from "./components/MissingShoesHeader";
import { MissingShoes } from "./components/MissingShoes";

const Page = async() => {
  const missingShoesData = await getAllMissingShoes();
  const breadcrumbs = [
    { href: Routes.MissingShoes, label: "Missing shoes" },
    { href: Routes.AddMissingShoes, label: "Add missing shoes" },
  ];
  return (
    <div>
      <MissingShoesHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <MissingShoes missingShoesData={missingShoesData}/>
      </PageLayout>
    </div>
  );
};

export default Page;
