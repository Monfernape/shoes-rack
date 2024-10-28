import { BasedBreadCrumb } from "@/components/common/BasedBreadCrumb/BasedBreadCrumb";
import React from "react";

const breadcrumbs = [
    { href: "/member", label: "Member" },
    {href: "/member/add", label: "New Member" },
  ]

export const MemberBreadCrumbs = () => {
  return (
    <div>
      <BasedBreadCrumb
        breadcrumbs={breadcrumbs}
      />
    </div>
  );
};
