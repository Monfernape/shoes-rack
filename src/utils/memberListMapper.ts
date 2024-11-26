import { Member } from "@/types";
import { roleFormmater } from "./memberRoleFormatter";
import { formattedPhoneNumber } from "./formattedPhoneNumber";

export const memberListMapper = (members: Member[]) => {
  const mappedMembers = members.map((member) => ({
    ...member,
    phoneNumber: formattedPhoneNumber(member.phoneNumber),
    role: roleFormmater(member.role),
  }));
  console.log({mappedMembers})
  return mappedMembers;
};
