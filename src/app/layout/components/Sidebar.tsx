"use client";
import React from "react";
import { logoutUser } from "@/app/(auth)/login/actions/logoutUser";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import Link from "next/link";
import {
  DashboardIcon,
  ExclamationTriangleIcon,
  Cross1Icon,
  ExitIcon,
  PersonIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import {
  BellIcon,
  CalendarIcon,
  ChartNoAxesCombinedIcon,
  ClipboardIcon,
  HandCoinsIcon,
} from "lucide-react";
import { useUser } from "@/hooks/useGetLoggedinUser";
import { MemberRole } from "@/constant/constant";
import useMediaQuery from "@/hooks/use-media-query";

interface Props {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface Route {
  name: string;
  route: Routes;
  icon: React.ReactElement;
}

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: Props) => {
  const loginUser = useUser();
  const isSmallScreen = useMediaQuery("sm");

  const routes: Route[] = [
    {
      name: "Dashboard",
      route: Routes.Dashboard,
      icon: <DashboardIcon />,
    },
    {
      name: "Members",
      route: Routes.Members,
      icon: <PersonIcon />,
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
    ...(loginUser?.role !== MemberRole.Member
      ? [
          {
            name: "Attendance Report",
            route: Routes.AttendanceReport,
            icon: <ChartNoAxesCombinedIcon />,
          },
          {
            name: "Funds",
            route: Routes.Fund,
            icon: <HandCoinsIcon />,
          },
        ]
      : []),
  ];

  const onLogoutUser = () => {
    logoutUser();
  };

  return (
    <aside
      className={`
            ${isSidebarOpen || !isSmallScreen ? "block" : "hidden"}
            fixed top-0 right-0 inset-y-0 left-0 z-30 w-48 bg-sidebar shadow-md transform transition-transform duration-300 ease-in-out
                ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }  lg:translate-x-0 lg:block lg:fixed`}
    >
      <div className="flex flex-col h-full bg-sidebar-background">
        <div className="flex items-center justify-between p-4 text-gray-700 hover:bg-gray-100 rounded-lg">
          <h1 className={`text-sm font-medium text-gray-800 truncate sm:block`}>
            Shoes Rack
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Cross1Icon className="h-4 w-4 text-gray-800" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-2 text-xs">
            {routes.map((route , index) => (
              <li key={`route-${index}`}>
                <Link
                  href={route.route}
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-xs mr-3">
                    {React.cloneElement(route.icon, { className: "w-3.5 h-3.5" })}
                  </span>
                  <span className="text-xs">{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={onLogoutUser}
          >
            <ExitIcon className="w-3.5 h-3.5 mr-3" />
            <span className="text-xs">Logout</span>
          </button>
          <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <GearIcon className="w-3.5 h-3.5 mr-3" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};