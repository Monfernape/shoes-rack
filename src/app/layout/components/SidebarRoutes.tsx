import {
  DashboardIcon,
  ExclamationTriangleIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Routes } from "../../../lib/routes";
import {
  BellIcon,
  CalendarIcon,
  ClipboardIcon,
  HandCoinsIcon,
} from "lucide-react";
import { useState } from "react";
import { UserRole } from "@/types";

const member_routes = [
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
const shift_incharge_routes = [
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
const incharge_routes = [
  ...shift_incharge_routes,
  {
    name: "Funds",
    route: Routes.Fund,
    icon: <HandCoinsIcon />,
  },
];

export const getRoutesByUserRole = () => {
  const [userRole, setUserRole] = useState<UserRole | null>("incharge");

  const getRoutes = () => {
    switch (userRole) {
      case "incharge":
        return incharge_routes;
      case "shift-incharge":
        return shift_incharge_routes;
      case "member":
      default:
        return member_routes;
    }
  };
  return getRoutes();
};
