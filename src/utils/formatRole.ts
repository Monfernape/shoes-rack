import { UserRoleType } from "@/types";
import { UserRole } from "@/constant/constant";
import { capitalization, snakeToCapitalization } from "./utils";

export const formatRole = (role: UserRoleType) => {
  switch (role) {
    case UserRole.Member || UserRole.Incharge:
      return capitalization(role);
    case UserRole.ShiftIncharge:
      return snakeToCapitalization(role);
    default:
      break;
  }
};
