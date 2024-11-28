import { MemberRole } from "@/constant/constant";
import { capitalization, snakeToCapitalization } from "./utils";

export const formatRole = (role: MemberRole) => {
  switch (role) {
    case MemberRole.Member || MemberRole.Incharge:
      return capitalization(role);
    case MemberRole.ShiftIncharge:
      return snakeToCapitalization(role);
    default:
      break;
  }
};
