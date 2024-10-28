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
import { BreadcrumbsTypes } from "@/types";
// import useMediaQuery from '@/hooks/use-media-query'

interface Props {
  breadcrumbs: BreadcrumbsTypes[];
}

export const BasedBreadCrumb = ({ breadcrumbs }: Props) => {
  const pathname = usePathname();
  // const isDesktop = useMediaQuery("(min-width: 768px)")

  const updatedBreadCrumbs = useMemo(() => {
    const currenLinkIndex = breadcrumbs.findIndex(
      (x) => x.href === pathname
    );
    const updatedLinks = breadcrumbs.slice(0, currenLinkIndex + 1);
    return updatedLinks;
  }, [pathname]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList data-testid="breadCrumb">
          {updatedBreadCrumbs.map((breadcrumb, index) => (
            <BreadcrumbItem key={index}>
              <>
                <BreadcrumbLink
                  asChild
                  className={`max-w-20 truncate md:max-w-none ${
                    pathname === breadcrumb.href
                      ? "text-foreground"
                      : "transition-colors"
                  }`}
                >
                  <Link href={breadcrumb.href} data-testid="mytest" role="link" >
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>

                {updatedBreadCrumbs.length > 1 && <BreadcrumbSeparator />}
              </>
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
