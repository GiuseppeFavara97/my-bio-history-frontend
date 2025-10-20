"use client";

import React, { useState } from "react";
import ToggleTheme from "./toggleTheme";
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


export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const router = useRouter();
  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 h-25 border-b bg-white dark:bg-gray-950">
        <div className="flex ">
          <div className="">
            <img width={125} height={30} src="/myLogo.png" alt="Logo" className="cursor-pointer transition-transform duration-300 ease-in-out active:scale-90 hover:scale-105" onClick={() => router.push("/")} />
          </div>
          <h2 className="flex items-center ">
            <p className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-blue-400 to-sky-400  ">My Bio-History</p>
          </h2>
          <NavigationMenu className="list-none md:hidden">
            <NavigationMenuItem className="transition duration-500 hover:scale-110 animat">
              <NavigationMenuTrigger className=""> <Ham /> </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white dark:bg-zinc-900 p-4 rounded shadow flex flex-col gap-2 w-30">
                <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/">Home</NavigationMenuLink>
                <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/about">About</NavigationMenuLink>
                <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/login">Login</NavigationMenuLink>
                <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/profile">Profilo</NavigationMenuLink>
                <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/register">Registrati</NavigationMenuLink>
                <NavigationMenuLink className="ease-in-out duration-300 hover:scale-120 hover:font-bold hover:translate-x-5" href="/register">Contatti</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
        <NavigationMenu className="hidden md:block self-center ">
          <NavigationMenuList className="flex gap-6">
              <NavigationMenuLink href="#chi-siamo">Chi siamo</NavigationMenuLink>
              <NavigationMenuLink href="/contatti">Contatti</NavigationMenuLink>
              <NavigationMenuLink href="/login">Login</NavigationMenuLink>
              <NavigationMenuLink href="/register">Registrati</NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Toggle Theme */}
        <ToggleTheme />
      </header>

    </>
  );
}