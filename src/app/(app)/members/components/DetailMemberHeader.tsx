"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/app/layout/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import { DetailMemberBreadCrumbs } from "./DetailMemberBreadCrumbs";

export const DetailMemberHeader = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const shouldNavigateToMembers = pathname === Routes.Members;

    router.push(
      shouldNavigateToMembers ? Routes.Members : `${Routes.MemberDetails}/${id}`
    );
  }, [pathname]);

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
            <DetailMemberBreadCrumbs id={id} />
          </div>
        </div>
      </header>
    </div>
  );
};
