"use client";
import { useState } from "react";
import SidebarDoctor from "./components/ui/SidebarDoctor";
import DoctorHome from "./components/home/DoctorHome";
import DoctorProvider, { useDoctor } from "./components/shared/DoctorProvider";
import DoctorAllegatoE from "./components/allegatoE/DoctorAllegatoE";

export default function HomeDoctor() {
  const currentView = useDoctor().currentView;
  return (
    <main className="flex h-screen w-full overflow-hidden">
      <div className="h-full w-full" id="rightside">
        {currentView === "home" ? <DoctorHome /> : currentView === "allegato E" ? <DoctorAllegatoE /> : ""}
      </div>
    </main>
  );
}
