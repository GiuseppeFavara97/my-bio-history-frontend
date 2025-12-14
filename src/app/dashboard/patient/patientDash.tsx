"use client"

import {
    ChevronRight,
    CircleUser,
    Settings,
    LogOut,
    ClipboardPlus,
    PillBottle,
    Stethoscope,
    ClipboardClock,
    Syringe,
    Upload
} from "lucide-react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import PatientProfile from "./components/profile"
import PatientAllergy from "./components/allergy/page"
import PatientVaccines from "./components/vaccine/page"
import PatientDocuments from "./components/upload/page"
import { User, Allergy } from "@/Types/Types"
import PatientCalendar from "./components/patientCalendar"
import PatientHome from "./components/patientHome"
import { logout } from "@/lib/api/auth"

type MainArea =
    | "profilo"
    | "settings"
    | "visite"
    | "allergy"
    | "vaccini"
    | "documenti"

type DashPatientProps = {
    userData: User
    patientAllergies: Allergy[]
}

export default function DashPatient({
    userData,
    patientAllergies
}: DashPatientProps) {
    const [togglePatientData, setPatientData] = useState<"menu" | "profile">(
        "menu"
    )
    const [toggleMainArea, setMainArea] = useState<MainArea>("profilo")

    const router = useRouter()

    async function handleLogout() {
        await logout()
        router.push("/auth")
    }

    return (
        <main className="flex flex-col sm:flex-row h-full m-10 bg-[#f4f5f7]">

            {/* SIDEBAR */}
            <aside className="m-1 gap-y-6 flex flex-col h-full w-full sm:w-1/3">

                {/* PROFILO */}
                <div className="bg-white rounded-2xl p-5 flex gap-4 items-center">
                    <img
                        src="/barney.webp"
                        alt="Foto profilo"
                        width={80}
                        className="rounded"
                    />

                    {togglePatientData === "menu" ? (
                        <div className="flex flex-col w-full">
                            <span className="text-lg font-semibold">
                                {userData.firstName} {userData.lastName}
                            </span>

                            <span className="text-sm text-gray-500 mb-3">
                                {userData.user?.email}
                            </span>

                            <SidebarItem
                                icon={<CircleUser />}
                                label="Profilo"
                                onClick={() => setMainArea("profilo")}
                            />

                            <SidebarItem
                                icon={<Settings />}
                                label="Impostazioni"
                                onClick={() => setMainArea("settings")}
                            />

                            <SidebarItem
                                icon={<LogOut />}
                                label="Logout"
                                danger
                                onClick={handleLogout}
                            />
                        </div>
                    ) : (
                        <PatientMiniProfile
                            userData={userData}
                            setPatientData={setPatientData}
                        />
                    )}
                </div>

                {/* CARTELLA CLINICA */}
                <div className="bg-white p-4 rounded-2xl space-y-2">
                    <span className="font-bold text-center block mb-2">
                        Cartella Clinica
                    </span>

                    <SidebarItem
                        icon={<ClipboardClock />}
                        label="Visite"
                        onClick={() => setMainArea("visite")}
                    />

                    <SidebarItem
                        icon={<PillBottle />}
                        label="Allergie"
                        onClick={() => setMainArea("allergy")}
                    />

                    <SidebarItem
                        icon={<Syringe />}
                        label="Vaccini"
                        onClick={() => setMainArea("vaccini")}
                    />

                    <SidebarItem
                        icon={<Upload />}
                        label="Carica documento"
                        onClick={() => setMainArea("documenti")}
                    />
                </div>
            </aside>

            {/* CONTENUTO */}
            <section className="flex-1 bg-white m-6 rounded-2xl p-6">
                {toggleMainArea === "profilo" && (
                    <PatientProfile userData={userData} />
                )}

                {toggleMainArea === "visite" && <PatientVisits />}

                {toggleMainArea === "allergy" && (
                    <PatientAllergy allergies={patientAllergies} />
                )}

                {toggleMainArea === "vaccini" && <PatientVaccines />}

                {toggleMainArea === "documenti" && <PatientDocuments />}
            </section>
        </main>
    )
}

function SidebarItem({
    icon,
    label,
    onClick,
    danger = false
}: {
    icon: React.ReactNode
    label: string
    onClick?: () => void
    danger?: boolean
}) {
    return (
        <div
            onClick={onClick}
            className={`flex justify-between items-center cursor-pointer rounded-xl px-3 py-2
      ${danger
                    ? "hover:bg-red-50 text-red-600"
                    : "hover:bg-gray-100"
                }`}
        >
            <div className="flex gap-3 items-center">
                {icon}
                <span>{label}</span>
            </div>
            <ChevronRight />
        </div>
    )
}