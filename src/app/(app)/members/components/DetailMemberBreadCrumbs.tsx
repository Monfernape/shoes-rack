import React from "react";
import { BasedBreadCrumb } from "@/common/BasedBreadCrumb/BasedBreadCrumb";
import { Routes } from "@/lib/routes";
import { Breadcrumbs } from "@/types";



export const DetailMemberBreadCrumbs = ({id} : {id:string}) => {
    const breadcrumbs: Breadcrumbs[] = [
        { href: Routes.Members, label: "Members" },
        { href: `${Routes.MemberDetails}/${id}` ,label: "Member Detail" },
      ];
  return <BasedBreadCrumb breadcrumbs={breadcrumbs} />;
};
