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
          {updatedBreadCrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center">
              {index !== 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className={`max-w-56 text-xs text-gray-800 font-normal whitespace-nowrap md:max-w-none
                   ${
                     index === updatedBreadCrumbs.length-1
                       ?  "text-gray-800" : "text-gray-500"
                   }`}
                >
                  <Link href={breadcrumb.href} data-testid="mytest" role="link">
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
