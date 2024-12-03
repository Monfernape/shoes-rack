import React from "react";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
import { Routes } from "@/lib/routes";
import { Breadcrumbs } from "@/types";

export const EditMemberBreadCrumbs = ({ id }: { id: string }) => {
  const breadcrumbs: Breadcrumbs[] = [
    { href: Routes.Members, label: "Members" },
    { href: `${Routes.EditMember}/${id}`, label: "Edit Member" },
  ];
  return <BasedBreadCrumb breadcrumbs={breadcrumbs} />;
};
