import { DashboardIcon, ExclamationTriangleIcon, PersonIcon } from "@radix-ui/react-icons";
import { Routes } from "../../lib/routes";
import { BellIcon, CalendarIcon, ClipboardIcon, HandCoinsIcon } from "lucide-react";

export const member_routes = [
    {
        name: "Dashboard",
        route: Routes.Dashboard,
        icon: <DashboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Notifications",
        route: Routes.Notification,
        icon: <BellIcon  className="w-5 h-5 mr-3"/>
    },
    {
        name: "Attendance",
        route: Routes.Attendance,
        icon: <CalendarIcon  className="w-5 h-5 mr-3"/>
    },
    {
        name: "Leave Requests",
        route: Routes.LeaveRequest,
        icon: <ClipboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Missing Shoes",
        route: Routes.MissingShoes,
        icon: <ExclamationTriangleIcon className="w-5 h-5 mr-3"/>
    },
];
export const shift_incharge_routes = [
    {
        name: "Dashboard",
        route: Routes.Dashboard,
        icon: <DashboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Notifications",
        route: Routes.Notification,
        icon: <BellIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Attendance",
        route: Routes.Attendance,
        icon: <CalendarIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Members",
        route: Routes.Member,
        icon: <PersonIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Leave Requests",
        route: Routes.LeaveRequest,
        icon: <ClipboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Missing Shoes",
        route: Routes.MissingShoes,
        icon: <ExclamationTriangleIcon className="w-5 h-5 mr-3" />
    },

];
export const incharge_routes = [
    {
        name: "Dashboard",
        route: Routes.Dashboard,
        icon: <DashboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Notifications",
        route: Routes.Notification,
        icon: <BellIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Attendance",
        route: Routes.Attendance,
        icon: <CalendarIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Members",
        route: Routes.Member,
        icon: <PersonIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Shift Incharge",
        route: Routes.ShiftIncharge,
        icon: <PersonIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Leave Requests",
        route: Routes.LeaveRequest,
        icon: <ClipboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Missing Shoes",
        route: Routes.MissingShoes,
        icon: <ExclamationTriangleIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Funds",
        route: Routes.Fund,
        icon: <HandCoinsIcon className="w-5 h-5 mr-3"/>
    },
];