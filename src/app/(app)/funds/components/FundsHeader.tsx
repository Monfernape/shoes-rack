import React from "react";
import NavigationButton from "@/common/NavigationButton";
import { Breadcrumbs, UserDetails } from "@/types";
import { MemberRole } from "@/constant/constant";
import { Routes } from "@/lib/routes";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";
interface Props {
  breadcrumbs: Breadcrumbs[];
  user: UserDetails;
}

export const FundsHeader = ({ breadcrumbs, user }: Props) => {
  return (
    <HeaderWrapper breadcrumbs={breadcrumbs}>
      {user?.role !== MemberRole.Member && (
        <NavigationButton path={Routes.AddFund} buttonText="Add Fund" />
      )}
    </HeaderWrapper>
  );
};
