import { Button } from "@/components/ui/button";
import { Cross1Icon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { SideBarRoutes } from "./SidebarRoute";

interface Props {
  isSidebarOpen: Boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: Props) => {
  const sideBarRoutes = SideBarRoutes()
  return (
    <aside
      className={`
            ${isSidebarOpen ? "block" : "hidden"}
            fixed top-0 right-0 inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
                ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }  lg:translate-x-0 lg:block lg:sticky`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 text-gray-700 hover:bg-gray-100 rounded-lg">
          <h1
            className={`text-xl font-semibold text-gray-800 truncate sm:block`}
          >
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
          <ul className="p-2 space-y-2">
            {sideBarRoutes.map((r) => (
              <li key={r.route}>
                <Link
                  href={r.route}
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {r.icon}
                  <span className="text-sm">{r.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <ExitIcon className="w-5 h-5 mr-3" />
            <span className="text-sm">Logout</span>
          </button>
          <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <GearIcon className="w-5 h-5 mr-3" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
