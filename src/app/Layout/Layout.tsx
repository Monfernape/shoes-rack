"use client"
import React, {  useState } from 'react'
import {
    MagnifyingGlassIcon,
    HamburgerMenuIcon,
} from '@radix-ui/react-icons'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sidebar } from '../components/Sidebar'
import { routes_title } from '@/lib/Routes'
import { usePathname } from 'next/navigation'

type UserRole = "Incharge" | "member" | "Shift-Incharge";

export function Layout({ children }: { children: React.ReactNode, }) {
    const pathname = usePathname()

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isTilleHide, setIsTitleHide] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    return (
        <div className="bg-gray-100 flex ">
            {
                userRole &&
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    userRole={userRole}
                />
            }
            <div className="flex flex-col w-full h-screen">
                <header className="bg-white shadow-sm sticky top-0">
                    <div className="flex items-center justify-between px-4 py-4">
                        <div className="flex items-center">
                            {
                                userRole &&
                                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 lg:hidden">
                                    <HamburgerMenuIcon className="h-6 w-6" />
                                </Button>
                            }
                            {
                                (!isTilleHide ||  !userRole)&&
                                <h1 className={`text-xl font-semibold text-gray-800 truncate lg:${ !userRole ? "block" : "hidden"}`}> Shoes Rack</h1>
                            }
                            <h2 className={`text-xl font-semibold text-gray-800 truncate hidden lg:block`}>
                             {
                                routes_title.find(x => x.route === pathname)?.name
                             }
                            </h2>
                        </div>
                        {
                            userRole &&
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <Input
                                        type="search"
                                        placeholder="Search..."
                                        onFocus={() => { setIsTitleHide(true) }}
                                        onBlur={() => { setIsTitleHide(false) }}
                                        className="pl-10 pr-4 py-2 w-12 focus-visible:w-64 sm:w-40 md:w-60 rounded-full text-sm"
                                    />
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
                                </div>
                            </div>
                        }
                    </div>
                </header>
                {children}
            </div>
        </div>
    )
}