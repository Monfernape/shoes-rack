"use client";
import React from "react";
import { logoutUser } from "@/app/(auth)/login/actions/logoutUser";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import {} from "@radix-ui/react-icons";
import Link from "next/link";
import {
  DashboardIcon,
  ExclamationTriangleIcon,
  Cross1Icon,
  ExitIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import {
  BellIcon,
  CalendarIcon,
  ClipboardIcon,
  HandCoinsIcon,
} from "lucide-react";

interface Props {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const roleBasedRoutes = [
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
  {
    name: "Funds",
    route: Routes.Fund,
    icon: <HandCoinsIcon />,
  },
];

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: Props) => {
  // TODO : role will be dynamic after user login

  const onLogoutUser = () => {
    logoutUser();
  };

  if (isSidebarOpen) {
    return null;
  }

  return (
    <aside
      className={`
            ${isSidebarOpen ? "block" : "hidden"}
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
            {roleBasedRoutes.map((r) => (
              <li key={r.route}>
                <Link
                  href={r.route}
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-xs mr-3">
                    {React.cloneElement(r.icon, { className: "w-3.5 h-3.5" })}
                  </span>
                  <span className="text-xs">{r.name}</span>
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
