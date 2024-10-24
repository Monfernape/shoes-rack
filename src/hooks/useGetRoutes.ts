import { useMemo } from "react";
import { incharge_routes, member_routes, shift_incharge_routes } from "@/app/layout/components/SidebarRoutes";
import { UserRole } from "@/types";
import { MemberRole } from "@/lib/routes";

export const useGetRoutes = (userRole: UserRole) => {
  const routes = useMemo(() => {
    switch (userRole) {
      case MemberRole.Incharge:
        return incharge_routes;
      case MemberRole.ShiftIncharge:
        return shift_incharge_routes;
      case MemberRole.Member:
      default:
        return member_routes;
    }
  }, [userRole]);

  return routes;
};
