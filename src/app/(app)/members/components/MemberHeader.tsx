"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Sidebar } from "@/app/layout/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import useDebounce from "@/hooks/useDebounce";
import NavigationButton from "@/common/NavigationButton";
import { Breadcrumbs } from "@/types";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
import { useUser } from "@/hooks/useGetLoggedinUser";
import { MemberRole } from "@/constant/constant";

export const MemberHeader = ({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumbs[];
}) => {
  const pathname = usePathname();
  const user = useUser();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isTitleHide, setIsTitleHide] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debounceValue) {
      return router.push(`${Routes.Members}?key=${debounceValue}`);
    }
    return router.push(pathname);
  }, [debounceValue, pathname]);

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
          {pathname !== Routes.Login && pathname === Routes.Members && (
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  data-testid="searchInput"
                  onFocus={() => {
                    setIsTitleHide(true);
                  }}
                  onBlur={() => {
                    setIsTitleHide(false);
                  }}
                  onChange={handleSearchQueryChange}
                  className={`pr-4 py-2 h-7 ${
                    isTitleHide ? "w-32 pl-10" : "w-2 pl-6"
                  } md:w-60 md:pl-10 rounded text-xs`}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              </div>
              {user?.role !== MemberRole.Member &&
                pathname === Routes.Members && (
                  <NavigationButton
                    path={Routes.AddMember}
                    buttonText="Add Member"
                    data-testid="addMemberButton"
                  />
                )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
