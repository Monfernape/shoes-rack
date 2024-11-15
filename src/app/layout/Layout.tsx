"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { cx } from "class-variance-authority";
import { Routes } from "@/lib/routes";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {(pathname !== Routes.Login || isSidebarOpen) && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div
        className={cx(
          `flex flex-col w-full h-screen ${pathname !== Routes.Login && "lg:ml-48"}`
        )}
      >
        {children}
      </div>
    </div>
  );
}
