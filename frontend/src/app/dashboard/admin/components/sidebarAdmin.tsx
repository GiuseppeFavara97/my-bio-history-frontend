'use client'

import { useState } from "react"
import { useSharedData } from "../../_shared/SharedData"
import { Activity, HeartMinus, Settings, SquareChartGantt, Syringe, ClipboardPlus, PillBottle, User, FileText } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    const { selectedTab, setSelectedTab, patientName } = useSharedData();
    const [open, setOpen] = useState(false);


return (
    <div className="text-white">
        <div
            onMouseLeave={() => setOpen(false)}
            onMouseEnter={() => setOpen(true)}
            className={`flex flex-col h- transition-all duration-300 ease-in-out
            ${open ? "w-56" : "w-28"}
            bg-gradient-to-b from-gray-950 via-gray-700 h-full to-gray-950 border-r border-gray-700 rounded-r-xl`}
        >
            <div className="flex flex-col space-y-2 p-2 h-full">
                <p className="text-center font-bold font-serif"></p>
                <p className="text-center">AdminTools</p>

            <div className="py-5 flex justify-center items-center gap-2">
                <Settings className={`${open && " hidden"}   cursor-none w-5 h-5`} />
                {open && <span>Menu</span>}
            </div>

            <button
                onClick={() => setSelectedTab("listUsers")}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >   
                <User className="w-5 h-5 text-blue-400" />
                <Link href="/profile"/>
            {open && "Lista Utenti"}
            
            </button>

            <button
                onClick={() => setSelectedTab("medical")}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
                <Activity className="w-5 h-5 text-green-400" />
                {open && "Cartella clinica"}
            </button>

            <button
                onClick={() => setSelectedTab("allergy")}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
                <HeartMinus className="w-5 h-5 text-red-400" />
                {open && "Allergie"}
            </button>

            <button
                onClick={() => setSelectedTab("vaccine")}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
                <Syringe className="w-5 h-5 text-blue-400" />
                {open && "Vaccini"}
            </button>

             <button
                onClick={() => setSelectedTab("diagnoses")}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
                <ClipboardPlus className="w-5 h-5 text-red-400" />
                {open && "Diagnosi"}
            </button>

            <button
                onClick={() => setSelectedTab("care")}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
                <PillBottle className="w-5 h-5 text-amber-700" />
                {open && "Terapie"}
            </button>

            <button
                onClick={() => setSelectedTab("documents")}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
                <FileText className="w-5 h-5 text-purple-400" />
                {open && "Documenti"}
            </button>
            </div>
        </div>
    </div>
);
}