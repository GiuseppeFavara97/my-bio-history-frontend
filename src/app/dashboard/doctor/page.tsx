"use client";
import { useState } from "react";
import SidebarDoctor from "./components/ui/SidebarDoctor";
import DoctorHome from "./components/home/DoctorHome";
import DoctorProvider, { useDoctor } from "./components/shared/DoctorProvider";
import DoctorAllegatoE from "./components/allegatoE/DoctorAllegatoE";
import DashboardSettings from "@/components/dashboard/Settings";
import Calendar from "./components/calendar/Calendar";

export default function HomeDoctor() {
  const currentView = useDoctor().currentView;
  return (
    <main className="dark:bg-background flex h-screen w-full overflow-hidden">
      <div className="h-full w-full" id="rightside">
        {currentView === "home" ? (
          <DoctorHome />
        ) : currentView === "allegato E" ? (
          <DoctorAllegatoE />
        ) : currentView === "settings" ? (
          <div className="h-full overflow-y-auto p-10">
            <DashboardSettings />
          </div>
        ) : currentView === "calendar" ? (
          <Calendar />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
