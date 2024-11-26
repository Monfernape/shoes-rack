import { UserRoleType } from "@/types";
import { capitalization, snakeToCapitalization } from "./stringFormater";
import { UserRole } from "@/constant/constant";

export const roleFormmater = (role: UserRoleType) => {
  switch (role) {
    case UserRole.Member || UserRole.Incharge:
      return capitalization(role);
    case UserRole.ShiftIncharge:
      return snakeToCapitalization(role);
    default:
      break;
  }
};
