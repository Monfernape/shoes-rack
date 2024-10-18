import { DashboardIcon, ExclamationTriangleIcon, PersonIcon } from "@radix-ui/react-icons";
import { Routes } from "../../lib/routes";
import { BellIcon, CalendarIcon, ClipboardIcon, HandCoinsIcon } from "lucide-react";

export const member_routes = [
    {
        name: "Dashboard",
        route: Routes.dashboard,
        icon: <DashboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Notifications",
        route: Routes.notification,
        icon: <BellIcon  className="w-5 h-5 mr-3"/>
    },
    {
        name: "Attendance",
        route: Routes.attendance,
        icon: <CalendarIcon  className="w-5 h-5 mr-3"/>
    },
    {
        name: "Leave Requests",
        route: Routes.mark_attendance,
        icon: <ClipboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Missing Shoes",
        route: Routes.missing_shoes,
        icon: <ExclamationTriangleIcon className="w-5 h-5 mr-3"/>
    },
];
export const shift_incharge_routes = [
    {
        name: "Dashboard",
        route: Routes.dashboard,
        icon: <DashboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Notifications",
        route: Routes.notification,
        icon: <BellIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Attendance",
        route: Routes.attendance,
        icon: <CalendarIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Members",
        route: Routes.member,
        icon: <PersonIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Leave Requests",
        route: Routes.mark_attendance,
        icon: <ClipboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Missing Shoes",
        route: Routes.missing_shoes,
        icon: <ExclamationTriangleIcon className="w-5 h-5 mr-3" />
    },

];
export const incharge_routes = [
    {
        name: "Dashboard",
        route: Routes.dashboard,
        icon: <DashboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Notifications",
        route: Routes.notification,
        icon: <BellIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Attendance",
        route: Routes.attendance,
        icon: <CalendarIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Members",
        route: Routes.member,
        icon: <PersonIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Shift Incharge",
        route: Routes.shift_incharge,
        icon: <PersonIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Leave Requests",
        route: Routes.mark_attendance,
        icon: <ClipboardIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Missing Shoes",
        route: Routes.missing_shoes,
        icon: <ExclamationTriangleIcon className="w-5 h-5 mr-3"/>
    },
    {
        name: "Funds",
        route: Routes.fund,
        icon: <HandCoinsIcon className="w-5 h-5 mr-3"/>
    },
];