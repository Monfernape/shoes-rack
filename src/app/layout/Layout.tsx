"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./components/Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {(pathname !== "/login" || isSidebarOpen) && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className="flex flex-col w-full h-screen lg:ml-48">
        {children}
      </div>
    </div>
  );
}
