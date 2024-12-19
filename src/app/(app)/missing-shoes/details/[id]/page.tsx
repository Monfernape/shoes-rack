import React from "react";
import { MissingShoesReportDetails } from "../../components/MissingShoesReportDetails";
import { getMissingShoeById } from "../../actions/get-missing-shoe-by-id";
import { PageLayout } from "@/app/layout/PageLayout";
import { MissingShoesHeader } from "../../components/MissingShoesHeader";
import { Routes } from "@/lib/routes";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const missingShoe = await getMissingShoeById(Number(id));

  const breadcrumbs = [
    { href: Routes.MissingShoes, label: "Missing shoes" },
    {
      href: `${Routes.MissingShoesDetails}/${id}`,
      label: id,
    },
  ];

  return (
    <>
      <MissingShoesHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <MissingShoesReportDetails missingShoe={missingShoe} />
      </PageLayout>
    </>
  );
};

export default Page;
