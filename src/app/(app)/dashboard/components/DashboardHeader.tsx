"use client";
import React from "react";

import { Breadcrumbs } from "@/types";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";

interface Props {
  breadcrumbs: Breadcrumbs[];
}

export const DashboardHeader = ({ breadcrumbs }: Props) => {
  return <HeaderWrapper breadcrumbs={breadcrumbs}></HeaderWrapper>;
};
