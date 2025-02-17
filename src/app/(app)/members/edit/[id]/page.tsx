import React from "react";
import { MemberFormBuilder } from "../../components/MemberFormBuilder";
import { getUserById } from "../../actions/get-user-by-id";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { MemberHeader } from "../../components/MemberHeader";
import { MemberRole } from "@/constant/constant";
import { permanentRedirect } from "next/navigation";

type Parameters = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Parameters) => {
  const { id } = params;
  const user = await getLoggedInUser();
  if (user.role === MemberRole.Member && user.id !== id) {
    permanentRedirect(Routes.Members);
  }

  const breadcrumbs: Breadcrumbs[] = [
    { href: Routes.Members, label: "Members" },
    { href: `${Routes.EditMember}/${id}`, label: "Edit member" },
  ];

  const member = await getUserById(id);

  if (
    (user.role === MemberRole.ShiftIncharge && member.shift !== user.shift) ||
    (user.role === MemberRole.ShiftIncharge &&
      member.role === (MemberRole.Incharge || MemberRole.ShiftIncharge))
  ) {
    permanentRedirect(Routes.Members);
  }
  return (
    <div className="flex flex-col ">
      <MemberHeader breadcrumbs={breadcrumbs} user={user} />
      <MemberFormBuilder member={member} user={user} />
    </div>
  );
};

export default Page;
