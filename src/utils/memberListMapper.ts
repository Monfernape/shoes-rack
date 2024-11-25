import { Member } from "@/types";
import { localNumberFormat } from "./phoneNumberFormatter";
import { roleFormmater } from "./memberRoleFormatter";

const MEMBER_LIST_MAPPER = (member: Member) => ({
  ...member,
  phoneNumber: localNumberFormat(member.phoneNumber),
  role: roleFormmater(member.role),
});

export const memberListMapper = (members: Member[]) => {
  const MemberList: Member[] = [];
  members.forEach((member) => {
    const mappedMember = MEMBER_LIST_MAPPER(member) as Member;
    MemberList.push(mappedMember);
  });
  return MemberList;
};
