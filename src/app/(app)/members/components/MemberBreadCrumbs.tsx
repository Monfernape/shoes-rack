import React from "react";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
import { Routes } from "@/lib/routes";
import { Breadcrumbs } from "@/types";

const breadcrumbs: Breadcrumbs[] = [
  { href: Routes.Members, label: "Members" },
  { href: Routes.AddMember, label: "New Member" },
];

export const MemberBreadCrumbs = () => {
  return <BasedBreadCrumb breadcrumbs={breadcrumbs} />;
};
