"use client";
import { Sidebar } from "@/app/layout/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MemberBreadCrumbs } from "./MemberBreadCrumbs";
export const MemeberHeader = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState<Boolean>(false);
  const [isTilleHide, setIsTitleHide] = useState<Boolean>(false);

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
            {pathname !== "/login" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="mr-2 lg:hidden"
              >
                <HamburgerMenuIcon className="h-6 w-6 text-black" />
              </Button>
            )}
            <h1
              className={`${
                !isTilleHide ? "block" : "hidden"
              } text-sm font-semibold text-gray-800 truncate lg:block`}
            >
              <MemberBreadCrumbs />
            </h1>
          </div>
          {pathname !== "/login" && (
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  onFocus={() => {
                    setIsTitleHide(true);
                  }}
                  onBlur={() => {
                    setIsTitleHide(false);
                  }}
                  className="pl-10 pr-4 py-2 w-12 h-7 sm:w-40 md:w-60 rounded text-xs"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              </div>
              <Button className="h-7">Add Member</Button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
