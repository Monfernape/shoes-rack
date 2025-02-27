"use client";
import React, { useState, ReactNode } from "react";
import { Sidebar } from "@/app/layout/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
import { Breadcrumbs } from "@/types";

import { Routes } from "@/lib/routes";

interface HeaderWrapperProps {
  breadcrumbs: Breadcrumbs[];
  children?: ReactNode;
  isShowBreadCrumbs?: boolean;
}

export const HeaderWrapper = ({
  isShowBreadCrumbs = true,
  breadcrumbs,
  children,
}: HeaderWrapperProps) => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`sticky z-50 w-full
        // loggedInUser?.temporary_password ? "top-10" : "top-0"
      `}
    >
      {isSidebarOpen && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <header className="bg-white shadow-sm sticky top-0">
        <div className="flex items-center justify-between px-2 md:px-8 py-4">
          <div className="flex items-center">
            {pathname !== Routes.Login && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:mr-2 lg:hidden"
              >
                <HamburgerMenuIcon className="h-6 w-6 text-black" />
              </Button>
            )}
            {isShowBreadCrumbs && <BasedBreadCrumb breadcrumbs={breadcrumbs} />}
          </div>
          <div className="flex items-center space-x-2 justify-end flex-1">
            {children}
          </div>
        </div>
      </header>
    </div>
  );
};
