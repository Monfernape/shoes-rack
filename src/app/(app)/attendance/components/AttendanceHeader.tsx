"use client";

import React, { useState } from "react";
import { Sidebar } from "@/app/layout/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { Routes } from "@/lib/routes";
import NavigationButton from "@/common/NavigationButton";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
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
