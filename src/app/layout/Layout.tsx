"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { RoutesTitle } from "@/lib/routes";
import { Sidebar } from "./components/Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTilleHide, setIsTitleHide] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  

  return (
    <div className="flex">
      {(pathname !== "/login" || isSidebarOpen)&& (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
      <div className="flex flex-col w-full h-screen">
        <div className="lg:ml-48">
        {children}
        </div>
      </div>
    </div>
  );
}