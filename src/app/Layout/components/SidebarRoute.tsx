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
    icon: <DashboardIcon className="w-5 h-5 mr-3" />,
  },
  {
    name: "Notifications",
    route: Routes.Notification,
    icon: <BellIcon className="w-5 h-5 mr-3" />,
  },
  {
    name: "Attendance",
    route: Routes.Attendance,
    icon: <CalendarIcon className="w-5 h-5 mr-3" />,
  },
  {
    name: "Leave Requests",
    route: Routes.LeaveRequest,
    icon: <ClipboardIcon className="w-5 h-5 mr-3" />,
  },
  {
    name: "Missing Shoes",
    route: Routes.MissingShoes,
    icon: <ExclamationTriangleIcon className="w-5 h-5 mr-3" />,
  },
];
const shift_incharge_routes = [
  ...member_routes,
  {
    name: "Members",
    route: Routes.Member,
    icon: <PersonIcon className="w-5 h-5 mr-3" />,
  },
  {
    name: "Leave Requests",
    route: Routes.LeaveRequest,
    icon: <ClipboardIcon className="w-5 h-5 mr-3" />,
  },
  {
    name: "Missing Shoes",
    route: Routes.MissingShoes,
    icon: <ExclamationTriangleIcon className="w-5 h-5 mr-3" />,
  },
];
const incharge_routes = [
  ...shift_incharge_routes,
  {
    name: "Funds",
    route: Routes.Fund,
    icon: <HandCoinsIcon className="w-5 h-5 mr-3" />,
  },
];


export const SideBarRoutes = () => {
    const [userRole, setUserRole] = useState<UserRole | null>("Incharge");
  
    const getRoutesByRole = () => {
      switch (userRole) {
        case "Incharge":
          return incharge_routes;
        case "Shift-Incharge":
          return shift_incharge_routes;
        case "member":
        default:
          return member_routes;
      }
    };
  
    return getRoutesByRole();
  };
