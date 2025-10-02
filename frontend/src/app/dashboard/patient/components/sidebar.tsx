'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" 
import { useSharedData } from "../../_shared/SharedData"

export default function Sidebar() {
  const { selectedTab, setSelectedTab, patientName } = useSharedData();
  const [open, setOpen] = useState(true);
  const router = useRouter(); // ✅ Funziona con App Router

  return (
    <div className='p-2 outline outline-indigo-600 rounded-r-2xl text-white'>
      <div className="text-center cursor-pointer" onClick={() => setOpen(old => !old)}>
        {open ? "Nascondi" : "Menu"}
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[100vh] w-full opacity-100" : "w-0 max-h-0 opacity-0 pointer-events-none"}`}>
        <div className='flex flex-col space-y-1 p-1 h-screen rounded-r-xl bg-gradient-to-br from-gray-800 to-gray-900'>
          <p className='text-center font-bold font-serif'>Benvenuto</p>
          <p className='text-center'>{patientName}</p>
          <p className='text-center py-5'>Strumenti</p>

          <button onClick={() => setSelectedTab("dati")} className='p-1 outline outline-indigo-600 rounded-r-full text-center cursor-pointer'>
            I miei dati
          </button>

          <button onClick={() => setSelectedTab("medical")} className='p-1 outline outline-indigo-600 rounded-r-full text-center cursor-pointer'>
            Cartella Clinica
          </button>

          <button onClick={() => setSelectedTab("allergy")} className='p-1 outline outline-indigo-600 rounded-r-full text-center cursor-pointer'>
            Allergia
          </button>

          <button
            onClick={() => {
              setSelectedTab("documents");
              router.push("/dashboard/documents");
            }}
            className='p-1 outline outline-indigo-600 rounded-r-full text-center cursor-pointer'
          >
            Documenti
          </button>
        </div>
      </div>
    </div>
  );
}
