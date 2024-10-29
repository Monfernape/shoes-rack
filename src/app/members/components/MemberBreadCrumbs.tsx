import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
import { Routes } from "@/lib/routes";
import { BreadcrumbsTypes } from "@/types";
import React from "react";

const breadcrumbs: BreadcrumbsTypes[] = [
  { href: Routes.Member, label: "Member" },
  { href: Routes.AddMember, label: "New Member" },
];

export const MemberBreadCrumbs = () => {
  return (
    <div>
      <BasedBreadCrumb breadcrumbs={breadcrumbs} />
    </div>
  );
};
