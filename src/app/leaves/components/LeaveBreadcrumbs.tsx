import React from "react";
import { Routes } from "@/lib/routes";
import { Breadcrumbs } from "@/types";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";

const breadcrumbs: Breadcrumbs[] = [
  { href: Routes.LeaveRequest, label: "Leaves" },
  { href: Routes.AddLeaveRequest, label: "New Leave Request" },
];

export const LeaveBreadcrumbs = () => {
  return <BasedBreadCrumb breadcrumbs={breadcrumbs} />;
};
