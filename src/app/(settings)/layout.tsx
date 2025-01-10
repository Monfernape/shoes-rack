"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { cx } from "class-variance-authority";
import { Routes } from "@/lib/routes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isRestrictPath =
    pathname === Routes.Playground || pathname === Routes.Login;

  return (
    <>
      <div className="flex">
        <div
          className={cx(
            `flex flex-col w-full h-screen ${isRestrictPath ? "" : "lg:ml-48"}`
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
