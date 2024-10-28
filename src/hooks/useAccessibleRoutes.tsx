
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

export const MEMBER_ROUTES = [
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

export const SHIFT_INCHARGE_ROUTES = [
  ...MEMBER_ROUTES,
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

export const INCHARGE_ROUTES = [
  ...SHIFT_INCHARGE_ROUTES,
  {
    name: "Funds",
    route: Routes.Fund,
    icon: <HandCoinsIcon />,
  },
];


export const useAccessibleRoutes = (userRole: UserRole) => {
  const routes = useMemo(() => {
    switch (userRole) {
      case MemberRole.Incharge:
        return INCHARGE_ROUTES;
      case MemberRole.ShiftIncharge:
        return SHIFT_INCHARGE_ROUTES;
      case MemberRole.Member:
      default:
        return MEMBER_ROUTES;
    }
  }, [userRole]);

  return routes;
};
