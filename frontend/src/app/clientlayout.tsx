"use client";

import React, { useState } from "react";
import ToggleTheme from "../components/toggleTheme";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 py-3 border-b bg-white dark:bg-black">
        {/* Logo mio della umbrella  + menu stile Hamburger */}
        <div className="flex items-center gap-4">
          <Image src="/umbrella.png" alt="Logo" className="h-10 w-10" />
          <button
            onClick={toggleSidebar}
            className="text-black dark:text-white focus:outline-none"
          >
            {/* Icona hamburger */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        
  <NavigationMenu className="hidden md:block">
    <NavigationMenuList className="flex gap-6">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Menu per prova</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-white dark:bg-zinc-900 p-4 rounded shadow flex flex-col gap-2">
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
          <NavigationMenuLink href="/login">Login</NavigationMenuLink>
          <NavigationMenuLink href="/profile">Profilo</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>

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
        <NavigationMenuLink href="/profile">Profilo</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>


        {/* Toggle Theme */}
        <ToggleTheme />
      </header>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-zinc-900 shadow-lg p-4">
          <nav className="flex flex-col gap-4">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/login">Login</a>
            <a href="/profile">Profilo</a>
          </nav>
        </aside>
      )}

      {/* Main content */}
      <main className="p-4">{children}</main>
    </>
  );
}