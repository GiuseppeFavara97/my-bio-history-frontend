"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Rileva login e cambio pagina
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [pathname]);

  // ✅ Nasconde i link solo se loggato e nella dashboard
const shouldHideLinks = isLoggedIn && pathname.startsWith("/dashboard");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 h-25 border-b bg-white dark:bg-gray-950">
        <div className="flex">
          <div>
            <img
              width={125}
              height={30}
              src="/myLogo.png"
              alt="Logo"
              className="cursor-pointer transition-transform duration-300 ease-in-out active:scale-90 hover:scale-105"
              onClick={() => router.push("/")}
            />
          </div>
          <h2 className="flex items-center">
            <p className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-blue-400 to-sky-400">
              My Bio-History
            </p>
          </h2>

          {/* Mobile Menu */}
          <NavigationMenu className="list-none md:hidden">
            <NavigationMenuItem className="transition duration-500 hover:scale-110 animat">
              <NavigationMenuTrigger>
                <Ham />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white dark:bg-zinc-900 p-4 rounded shadow flex flex-col gap-2 w-30">
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
                <NavigationMenuLink href="/about">About</NavigationMenuLink>
                {!shouldHideLinks && (
                  <>
                    <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                    <NavigationMenuLink href="/register">Registrati</NavigationMenuLink>
                  </>
                )}
                <NavigationMenuLink href="/profile">Profilo</NavigationMenuLink>
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:underline mt-2 text-left"
                  >
                    Logout
                  </button>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:block self-center">
          <NavigationMenuList className="flex gap-6">
            {!shouldHideLinks && (
              <>
                <NavigationMenuLink href="#chi-siamo">Chi siamo</NavigationMenuLink>
                <NavigationMenuLink href="/contatti">Contatti</NavigationMenuLink>
                <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                <NavigationMenuLink href="/register">Registrati</NavigationMenuLink>
              </>
            )}
            
          </NavigationMenuList>
        </NavigationMenu>

        <ToggleTheme />
      </header>
    </>
  );
}
