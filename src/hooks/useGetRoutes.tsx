
import { useMemo } from "react";
import { UserRole } from "@/types";
import { MemberRole, Routes } from "@/lib/routes";

import {
  DashboardIcon,
  ExclamationTriangleIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  BellIcon,
  CalendarIcon,
  ClipboardIcon,
  HandCoinsIcon,
} from "lucide-react";

export const member_routes = [
  {
    name: "Dashboard",
    route: Routes.Dashboard,
    icon: <DashboardIcon />,
  },
  {
    name: "Notifications",
    route: Routes.Notification,
    icon: <BellIcon />,
  },
  {
    name: "Attendance",
    route: Routes.Attendance,
    icon: <CalendarIcon />,
  },
  {
    name: "Leave Requests",
    route: Routes.LeaveRequest,
    icon: <ClipboardIcon />,
  },
  {
    name: "Missing Shoes",
    route: Routes.MissingShoes,
    icon: <ExclamationTriangleIcon />,
  },
];

export const shift_incharge_routes = [
  ...member_routes,
  {
    name: "Members",
    route: Routes.Member,
    icon: <PersonIcon />,
  },
  {
    name: "Leave Requests",
    route: Routes.LeaveRequest,
    icon: <ClipboardIcon />,
  },
  {
    name: "Missing Shoes",
    route: Routes.MissingShoes,
    icon: <ExclamationTriangleIcon />,
  },
];

export const incharge_routes = [
  ...shift_incharge_routes,
  {
    name: "Funds",
    route: Routes.Fund,
    icon: <HandCoinsIcon />,
  },
];


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
