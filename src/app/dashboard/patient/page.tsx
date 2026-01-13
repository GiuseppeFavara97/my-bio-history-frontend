"use client";

import {
    ChevronRight,
    CircleUser,
    Settings,
    LogOut,
    ClipboardClock,
    PillBottle,
    Syringe,
    Upload,
    LayoutDashboard
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentPatient } from "@/lib/api/patient";
import { logout } from "@/lib/api/auth";
import { Patient, Allergy } from "@/Types/Types";
import { useTranslation } from "@/components/language-provider";

import PatientProfile from "./components/profile";
import PatientAllergy from "./components/allergy/page";
import PatientVaccines from "./components/vaccine/page";
import PatientDocuments from "./components/upload/page";
import PatientHome from "./components/patientHome";
import DashboardSettings from "@/components/dashboard/Settings";

type MainArea = "cartella" | "profilo" | "settings" | "visite" | "allergy" | "vaccini" | "documenti";

export default function PatientPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const [mainArea, setMainArea] = useState<MainArea>("cartella");

    useEffect(() => {
        async function fetchPatient() {
            try {
                const data = await getCurrentPatient();
                setPatient(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPatient();
    }, [router]);

    // Logout
    async function handleLogout() {
        await logout();
        router.push("/auth");
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg dark:text-gray-400">{t("loading_patient")}</p>
            </div>
        );
    }

    if (!patient) return null;

    const { firstName, lastName, user, allergies } = patient;

    // Mappa delle sezioni principali
    const sections: Record<MainArea, JSX.Element> = {
        cartella: <PatientHome patient={patient} setMainArea={setMainArea} />,
        profilo: <PatientProfile userData={patient} userDataAccount={user} setMainArea={setMainArea} />,
        visite: <div>{t("visits")}</div>, // Placeholder per PatientVisits
        allergy: <PatientAllergy allergies={allergies as Allergy[]} />,
        vaccini: <PatientVaccines />,
        documenti: <PatientDocuments />,
        settings: <DashboardSettings />,
    };

    return (
        <main className="flex flex-col sm:flex-row h-full m-10 bg-[#f4f5f7] dark:bg-background">
            {/* Sidebar */}
            <aside className="m-1 gap-y-6 flex flex-col h-full w-full sm:w-1/3">
                <div className="bg-white dark:bg-card rounded-2xl p-5 flex gap-4 items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-lg font-semibold dark:text-white">{firstName} {lastName}</span>
                        <span className="text-sm text-gray-500 mb-3">{user?.email}</span>

                        <SidebarItem
                            icon={<CircleUser />}
                            label={t("profile")}
                            active={mainArea === "profilo"}
                            onClick={() => setMainArea("profilo")}
                        />
                        <SidebarItem
                            icon={<Settings />}
                            label={t("settings")}
                            active={mainArea === "settings"}
                            onClick={() => setMainArea("settings")}
                        />
                        <SidebarItem
                            icon={<LogOut />}
                            label={t("logout")}
                            danger
                            onClick={handleLogout}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-card p-4 rounded-2xl space-y-2">
                    <span className="font-bold text-center block mb-2 dark:text-white">{t("clinical_record")}</span>

                    <SidebarItem
                        icon={<LayoutDashboard />}
                        label={t("summary")}
                        active={mainArea === "cartella"}
                        onClick={() => setMainArea("cartella")}
                    />
                    <SidebarItem
                        icon={<ClipboardClock />}
                        label={t("visits")}
                        active={mainArea === "visite"}
                        onClick={() => setMainArea("visite")}
                    />
                    <SidebarItem
                        icon={<PillBottle />}
                        label={t("allergies")}
                        active={mainArea === "allergy"}
                        onClick={() => setMainArea("allergy")}
                    />
                    <SidebarItem
                        icon={<Syringe />}
                        label={t("vaccines")}
                        active={mainArea === "vaccini"}
                        onClick={() => setMainArea("vaccini")}
                    />
                    <SidebarItem
                        icon={<Upload />}
                        label={t("documents")}
                        active={mainArea === "documenti"}
                        onClick={() => setMainArea("documenti")}
                    />
                </div>
            </aside>

            {/* Contenuto principale */}
            <section className="flex-1 bg-white dark:bg-card m-6 rounded-2xl p-6 overflow-y-auto">
                {sections[mainArea]}
            </section>
        </main>
    );
}

// Componente riutilizzabile per voci della sidebar
function SidebarItem({
    icon,
    label,
    onClick,
    danger = false,
    active = false
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    danger?: boolean;
    active?: boolean;
}) {
    return (
        <div
            onClick={onClick}
            className={`flex justify-between items-center cursor-pointer rounded-xl px-3 py-2 transition-all
                ${danger
                    ? "hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                    : active
                        ? "bg-gray-100 dark:bg-gray-800 font-semibold dark:text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
                }`}
        >
            <div className="flex gap-3 items-center">{icon}<span className="dark:text-inherit">{label}</span></div>
            <ChevronRight className="h-4 w-4" />
        </div>
    );
}
