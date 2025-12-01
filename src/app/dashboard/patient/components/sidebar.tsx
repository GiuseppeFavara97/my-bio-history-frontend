"use client";

import { useRouter } from "next/navigation";
import { useSharedData } from "../../_shared/SharedData";
import {
  Activity,
  HeartMinus,
  Settings,
  SquareChartGantt,
  ClipboardPlus,
  PillBottle,
  CircleUserRound,
  Syringe,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const { selectedTab, setSelectedTab, patientName } = useSharedData();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="text-white h-screen">
      <div
        onMouseLeave={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        className={`flex flex-col h-full transition-all duration-300 ease-in-out
          ${open ? "w-56" : "w-28"}
          bg-gradient-to-b from-gray-950 via-gray-700 to-gray-950 border-r border-gray-700 rounded-r-xl`}
      >
        <div className="flex flex-col space-y-2 p-2 h-full">
          <p className="text-center font-bold font-serif">Benvenuto</p>
          <p className="text-center">{patientName}</p>

          <div className="py-5 flex justify-center items-center gap-2">
            <Settings className={`${open ? "hidden" : ""} cursor-none w-5 h-5`} />
            {open && <span>Menu</span>}
          </div>

          <button
            onClick={() => setSelectedTab("dati")}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
          >
            <CircleUserRound className="w-5 h-5 text-blue-400" />
            {open && <Link href="/profile">Profilo</Link>}
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
            onClick={() => {
              setSelectedTab("documents");
              router.push("/dashboard/documents");
            }}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
          >
            <SquareChartGantt className="w-5 h-5 text-indigo-600" />
            {open && "Documenti"}
          </button>
        </div>
      </div>
    </div>
  );
}
