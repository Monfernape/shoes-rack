import { PAKISTAN_COUNTRY_CODE, UserRole } from "@/constant/constant";
import { Member, UserDetails, UserRole as UserRoleType } from "@/types";

const localNumberFormmter = (phoneNumber: string) => {
  const number = phoneNumber.startsWith(PAKISTAN_COUNTRY_CODE)
    ? "0" + phoneNumber.slice(2)
    : phoneNumber;
  return number;
};

export const capitalization = (item: string) => {
  return item.charAt(0).toUpperCase() + item.slice(1);
};

function snakeToCapitalization(item: string) {
  return item
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const roleFormmater = (role: UserRoleType) => {
  switch (role) {
    case UserRole.Member || UserRole.Incharge:
      return capitalization(role);
    case UserRole.ShiftIncharge:
      return snakeToCapitalization(role);
    default:
      break;
  }
};

const MEMBER_LIST_MAPPER = (member: Member) => ({
  ...member,
  phoneNumber: localNumberFormmter(member.phoneNumber),
  role: roleFormmater(member.role),
});

export const memberListMapper = (members: Member[]) => {
  let MemberList: Member[] = [];
  members.forEach((member) => {
    const mappedMember = MEMBER_LIST_MAPPER(member) as Member;
    MemberList.push(mappedMember);
  });
  return MemberList;
};
