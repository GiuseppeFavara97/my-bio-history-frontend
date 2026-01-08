"use client";
import React, { useState } from "react";
import DoctorProvider, { useDoctor } from "./components/shared/DoctorProvider";
import DoctorHeader from "./components/ui/DoctorHeader";
import SidebarDoctor from "./components/ui/SidebarDoctor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#D9D9D6]">
      <DoctorProvider>
        <div className="flex h-full w-full">
          <SidebarDoctor />
          <div className="flex h-full w-full flex-col">
            <DoctorHeader />
            {children}
          </div>
        </div>
      </DoctorProvider>
    </main>
  );
}
