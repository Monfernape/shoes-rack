import React from "react";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
import { Routes } from "@/lib/routes";
import { BreadcrumbsTypes } from "@/types";

const breadcrumbs: BreadcrumbsTypes[] = [
  { href: Routes.Member, label: "Member" },
  { href: Routes.AddMember, label: "New Member" },
];

export const MemberBreadCrumbs = () => {
  return <BasedBreadCrumb breadcrumbs={breadcrumbs} />;
};
