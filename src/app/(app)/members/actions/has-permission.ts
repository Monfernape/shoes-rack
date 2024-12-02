import { MemberRole } from "@/constant/constant";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

export const hasPermission = async () => {
  const loginUser = await getLoggedInUser();
  if (loginUser?.role === MemberRole.Member) {
    return false;
  }
  return true;
};
