"use server";
import { MemberRole, UserStatus } from "@/constant/constant";
import { getMembers } from "@/app/(app)/members/actions/getMembers";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

export const getEditPermissions = async (memberId: number) => {

  const membersList = await getMembers("");

  if (!membersList.success) {
    return { error: membersList.message };
  }

  const members = membersList.data.filter((member) => member.status === UserStatus.Active);
  const loginUser = await getLoggedInUser();

  let roleBaseMembers;
  if (members) {
    if (loginUser?.role === MemberRole.Incharge) {
      roleBaseMembers = members;
    } else if (loginUser?.role === MemberRole.Member) {
      roleBaseMembers = members.filter((member) => loginUser?.id === member.id);
    } else {
      roleBaseMembers = members
        .filter(
          (member) =>
            loginUser?.id === member.id ||
            (member?.role === MemberRole.Member && loginUser?.shift === member.shift)
        )
        .map(({ id, name }) => ({
          id,
          name,
        }));
    }
  }
  
  // checking that logged edit-item id exists into members of loggedIn users
  // if user exist then we return true else return false
  const hasEditPermission = roleBaseMembers?.some((member) => member.id === memberId);
  return { hasEditPermission };
};
