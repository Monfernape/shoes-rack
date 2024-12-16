"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { cx } from "class-variance-authority";
import { Routes } from "@/lib/routes";
import { Sidebar } from "../layout/components/Sidebar";
import { AlertBar } from "@/common/StatusBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isRestrictPath =
    pathname === Routes.Playground || pathname === Routes.Login;

  return (
    <>
      <AlertBar />
        <div className="flex">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <div
            className={cx(
              `flex flex-col w-full h-screen ${
                isRestrictPath ? "" : "lg:ml-48"
              }`
            )}
          >
            {children}
          </div>
        </div>
    </>
  );
}
