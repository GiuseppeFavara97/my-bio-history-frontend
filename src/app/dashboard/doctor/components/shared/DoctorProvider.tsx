import { getCurrentDoctor } from "@/lib/api/doctor";
import { Doctor } from "@/Types/Types";
import React, { createContext, useContext, useEffect, useState } from "react";

type DoctorContextType = {
  doctor: Doctor | null;
  loading: boolean;
  
  currentView:string,
  setCurrentView:(V:string)=>void
  toggleSideBar:boolean,
  setToggleSideBar:(v:boolean)=>void
};

const DoctorContext = createContext<DoctorContextType | null>(null);

export default function DoctorProvider({ children }: { children: React.ReactNode }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<string>("home");
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLoggedDoctor() {
      try {
        const data = await getCurrentDoctor();
        setDoctor(data);
      } catch (err) {
        console.error("dottore non loggato", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLoggedDoctor();
  }, []);

  return <DoctorContext.Provider value={{ doctor, loading,currentView,setCurrentView,toggleSideBar,setToggleSideBar }}>{children}</DoctorContext.Provider>;
}

export function useDoctor() {
  const ctx = useContext(DoctorContext);
  if (!ctx) {
    throw new Error("useDoctor deve essere usato dentro DoctorProvider");
  }
  return ctx;
}
