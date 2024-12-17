import React from "react";
import { MissingShoesFormBuilder } from "../../add/components/MissingShoesFormBuilder";
import { getMissingShoeById } from "../../actions/get-missing-shoe-by-id";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";
import { MissingShoesHeader } from "../../components/MissingShoesHeader";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const missingShoe = await getMissingShoeById(Number(id));
  const breadcrumbs = [
    { href: Routes.MissingShoes, label: "Missing Shoes" },
    {
      href: `${Routes.EditMissingShoes}/${id}`,
      label: "Edit Missing Shoe",
    },
  ];
  return (
    <>
      <MissingShoesHeader breadcrumbs={breadcrumbs} />
      <PageLayout>
        <MissingShoesFormBuilder missingShoe={missingShoe} />
      </PageLayout>
    </>
  );
};

export default Page;
