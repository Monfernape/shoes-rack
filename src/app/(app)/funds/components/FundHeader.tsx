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

export const FundHeader = ({ breadcrumbs }: Props) => {
  const pathname = usePathname();
  return (
    <HeaderWrapper breadcrumbs={breadcrumbs}>
      {pathname === Routes.Fund && (
        <div className="flex items-center space-x-2">
          <NavigationButton
            path={Routes.AddFund}
            buttonText="Add Shoes"
          />
        </div>
      )}
    </HeaderWrapper>
  );
};