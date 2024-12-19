"use client";
import React from "react";
import NavigationButton from "@/common/NavigationButton";
import { Routes } from "@/lib/routes";
import { Breadcrumbs } from "@/types";
import { usePathname } from "next/navigation";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";

interface Props {
  breadcrumbs: Breadcrumbs[];
}

export const LeavesHeader = ({ breadcrumbs }: Props) => {
  const pathname = usePathname();
  return (
    <HeaderWrapper breadcrumbs={breadcrumbs}>
      {pathname === Routes.LeaveRequest && (
        <NavigationButton
          path={Routes.AddLeaveRequest}
          buttonText="Create Leave"
        />
      )}
    </HeaderWrapper>
  );
};
