import React from "react";
import { MissingShoes } from "./Components/MissingShoes";
import { Routes } from "@/lib/routes";
import { MissingShoesHeader } from "./Components/MissingShoesHeader";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = () => {
  const breadcrumbs = [
    { href: Routes.MissingShoes, label: "Missing shoes" },
    { href: Routes.AddMissingShoes, label: "Add missing shoes" },
  ];
  return (
    <div>
      <MissingShoesHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <MissingShoes />
      </PageLayout>
    </div>
  );
};

export default Page;
