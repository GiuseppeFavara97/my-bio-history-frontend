'use client'
import { useState } from "react";
import SidebarDoctor from "./components/SidebarDoctor";
import DoctorHome from "./components/DoctorHome";

export default function HomeDoctor() {
    const [toggleSidebar, setToggleSideBar] = useState<boolean>(true)
    const [currentView, setCurrentView] = useState<string>("home")

    return (
        <main className="flex outline h-full w-full">

            <SidebarDoctor currentView={currentView} open={toggleSidebar} toggle={setToggleSideBar} setCurrentView={setCurrentView} />

            <div className="w-full h-full" id="rightside">
            {currentView === "home" ? (<DoctorHome/>) : ("")}
            </div>
        </main>
    )
}