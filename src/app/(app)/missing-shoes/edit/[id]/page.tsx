import React from "react";
import { MissingShoesFormBuilder } from "../../add/components/MissingShoesFormBuilder";
import { getMissingShoeById } from "../../actions/get-missing-shoe-by-id";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";
import { MissingShoesHeader } from "../../components/MissingShoesHeader";
import { MissingShoeStatus } from "@/constant/constant";
import { permanentRedirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const breadcrumbs = [
    { href: Routes.MissingShoes, label: "Missing shoes" },
    {
      href: `${Routes.EditMissingShoes}/${id}`,
      label: "Edit Missing Shoe",
    },
  ];
  const missingShoe = await getMissingShoeById(Number(id));

  if (missingShoe?.status === MissingShoeStatus.Found) {
    return permanentRedirect(Routes.MissingShoes);
  }
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
