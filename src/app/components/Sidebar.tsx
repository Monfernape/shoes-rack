import { Button } from '@/components/ui/button'
import { Routes } from '@/lib/routes'
import { Cross1Icon, DashboardIcon, ExclamationTriangleIcon, ExitIcon, GearIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons'
import { BackpackIcon, BellIcon, CalendarIcon, ClipboardIcon, HandCoinsIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'


interface Sidebar {
    sidebarOpen: Boolean,
    toggleSidebar: () => void,
    userRole: String,
}

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

export const Sidebar = ({
    sidebarOpen,
    toggleSidebar,
}: Sidebar) => {
    const router = useRouter();
    return (
        <aside
            className={`
            ${sidebarOpen ? 'block' : 'hidden'}
            fixed top-0 right-0 inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}  lg:translate-x-0 lg:block lg:sticky`}
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                    <h1 className={`text-xl font-semibold text-gray-800 truncate sm:block`}> Shoes Rack</h1>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                        <Cross1Icon className="h-4 w-4 text-gray-800" />
                    </Button>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul className="p-2 space-y-2">
                        {
                            incharge_routes.map((x) => (
                                <li
                                    key={x.route}
                                    onClick={() => router.push(x.route)}
                                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    {x.icon}
                                    <span className="text-sm">{x.name}</span>
                                </li>
                            ))
                        }

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
    )
}
