"use client";

import React, { useState } from "react";
import { Sidebar } from "@/app/layout/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { Routes } from "@/lib/routes";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
import { Breadcrumbs } from "@/types";

export const InfoMemberHeader = ({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumbs[];
}) => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {isSidebarOpen && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <header className="bg-white shadow-sm sticky top-0">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            {pathname !== Routes.Login && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="mr-2 lg:hidden"
              >
                <HamburgerMenuIcon className="h-6 w-6 text-black" />
              </Button>
            )}
            <BasedBreadCrumb breadcrumbs={breadcrumbs} />
          </div>
        </div>
      </header>
    </div>
  );
};
