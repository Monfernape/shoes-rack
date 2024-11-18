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

  const restrictPath = pathname === Routes.Playground || pathname === Routes.Login;


  return (
    <div className="flex">
      {(!restrictPath || isSidebarOpen) && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div
        className={cx(
          `flex flex-col w-full h-screen ${
            restrictPath ? "" : "lg:ml-48"
          }`
        )}
      >
        {children}
      </div>
    </div>
  );
}
