"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import useMediaQuery from "@/hooks/use-media-query";
import { Breadcrumbs } from "@/types";

interface Props {
  breadcrumbs: Breadcrumbs[];
}

export const BasedBreadCrumb = ({ breadcrumbs }: Props) => {
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery("sm");

  const updatedBreadCrumbs = useMemo(() => {
    const currenLinkIndex = breadcrumbs.findIndex((x) => x.href === pathname);
    let updatedLinks = breadcrumbs.slice(0, currenLinkIndex + 1);
    if (isSmallScreen) {
      updatedLinks = breadcrumbs.slice(-1);
    }
    return updatedLinks;
  }, [pathname]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList data-testid="breadCrumb">
          {updatedBreadCrumbs.map((breadcrumb,index) => (
              <div key={breadcrumb.href} className="flex items-center">
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className={`max-w-20 text-sm font-medium text-gray-800 whitespace-nowrap md:max-w-none ${
                    pathname === breadcrumb.href
                      ? "text-foreground"
                      : "transition-colors"
                  }`}
                >
                  <Link
                    href={breadcrumb.href}
                    data-testid="mytest"
                    role="link"
                  >
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index + 1 !== updatedBreadCrumbs.length && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
