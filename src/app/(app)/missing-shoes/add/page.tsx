import React from "react";
import { MissingShoesFormBuilder } from "./components/MissingShoesFormBuilder";
import { PageLayout } from "@/app/layout/PageLayout";
import { Routes } from "@/lib/routes";
import { MissingShoesHeader } from "../components/MissingShoesHeader";

const Page = () => {
  const breadcrumbs = [
    { href: Routes.MissingShoes, label: "Missing Shoes" },
    {
      href: Routes.AddMissingShoes,
      label: "Add Missing Shoe Report",
    },
  ];
  return (
    <>
      <MissingShoesHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <MissingShoesFormBuilder />
      </PageLayout>
    </>
  );
};

export default Page;
