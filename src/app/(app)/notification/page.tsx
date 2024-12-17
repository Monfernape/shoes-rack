import React from "react";
import { BellIcon } from "lucide-react";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";

const breadcrumbs: Breadcrumbs[] = [{ href: Routes.Notification, label: "Notification" }];


const Page = async () => {
  const standarPageProps = {
    title: "Notification",
    description: `There are 169 unread Notifications `,
    actionButton: false,
    buttonIcon: <BellIcon />,
    hasContent: false,
  };
  return <>
   <HeaderWrapper breadcrumbs={breadcrumbs}/>
  <StandardPage {...standarPageProps} />
  </>

};
export default Page;
