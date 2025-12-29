"use client";
import { useState } from "react";
import SidebarDoctor from "./components/SidebarDoctor";
import DoctorHome from "./components/DoctorHome";
import DoctorProvider from "./components/shared/DoctorProvider";

export default function HomeDoctor() {
  const [toggleSidebar, setToggleSideBar] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<string>("home");

  return (
    <DoctorProvider>
      <main className="flex h-full w-full outline">
        <SidebarDoctor
          currentView={currentView}
          open={toggleSidebar}
          toggle={setToggleSideBar}
          setCurrentView={setCurrentView}
        />

        <div className="h-full w-full" id="rightside">
          {currentView === "home" ? <DoctorHome /> : ""}
        </div>
      </main>
    </DoctorProvider>
  );
}
