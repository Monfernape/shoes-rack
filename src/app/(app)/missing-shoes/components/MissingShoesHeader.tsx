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

export const MissingShoesHeader = ({ breadcrumbs }: Props) => {
  const pathname = usePathname();

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <HeaderWrapper breadcrumbs={breadcrumbs}>
      {pathname === Routes.MissingShoes && (
        <div className="flex items-center space-x-2">
          <NavigationButton
            path={Routes.AddMissingShoes}
            buttonText="Add Shoes"
          />
        </div>
      )}
    </HeaderWrapper>
  );
};
