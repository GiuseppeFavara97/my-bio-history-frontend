'use client'

import React, { createContext, useContext, useState } from "react"

type Shared = {
    selectedTab : string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
    patientName: string;
    setPatientName: React.Dispatch<React.SetStateAction<string>>;
}
const SharedData = createContext<Shared | null >(null);

export function DashboardProvider({children}: {children:React.ReactNode}) {

    const [selectedTab, setSelectedTab] = useState("dati")
    const [patientName, setPatientName] = useState("")

    return (
        <SharedData.Provider value={{selectedTab, setSelectedTab, patientName, setPatientName}} >
        {children}
        </SharedData.Provider>
    )

}

export function useSharedData() {
    const context= useContext(SharedData)
    if (!context) throw new Error("Error")
    
    return context;
}