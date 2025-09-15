"use client";

import React, { useState } from "react";
import ToggleTheme from "../../toggleTheme";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Ham from "@/components/ui/HamMenu";
import { useRouter } from "next/navigation";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const router= useRouter();
  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 py-3 border-b bg-white dark:bg-black">
        <div className="flex">
        <div className="">
          <img width={125} height={30} src="/myLogo.png" alt="Logo" className="" onClick={() => router.push("/")}/>
        </div>
        <h2 className="flex items-center ">
          <p className="shadow-2xl shadow-fuchsia-600 text-indigo-700 font-bold">My Bio-History</p>
          </h2>
        <NavigationMenu className="list-none md:hidden">
          <NavigationMenuItem className="transition duration-500 hover:scale-110 animat">
                <NavigationMenuTrigger className=""> <Ham/> </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white dark:bg-zinc-900 p-4 rounded shadow flex flex-col gap-2 w-30">
                  <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/">Home</NavigationMenuLink>
                  <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/about">About</NavigationMenuLink>
                  <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/login">Login</NavigationMenuLink>
                  <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/profile">Profilo</NavigationMenuLink>
                  <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/register">Registrati</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
      </div>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/login">Login</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/register">Registrati</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/profile">Profilo</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Toggle Theme */}
        <ToggleTheme />
      </header>

      {/* Main content */}
      <main className="p-4">{children}</main>
    </>
  );
}