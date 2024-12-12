"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Routes } from "@/lib/routes";
import NavigationButton from "@/common/NavigationButton";
import { Breadcrumbs } from "@/types";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";

interface Props {
  breadcrumbs: Breadcrumbs[];
}

export const AttendanceHeader = ({ breadcrumbs }: Props) => {
  const pathname = usePathname();

  return (
    <HeaderWrapper breadcrumbs={breadcrumbs}>
      {pathname === Routes.Attendance && (
        <NavigationButton
          path={Routes.AddLeaveRequest}
          buttonText="Create Leave"
        />
      )}
    </HeaderWrapper>
  );
};
