"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PatientSidebar from "./components/sidebar";
import PatientHeader from "./components/header";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="flex">
                <PatientSidebar open={open} setOpen={setOpen} />
                <div className="flex-1 min-h-screen ml-0 sm:ml-64">
                    <PatientHeader setOpen={setOpen} />
                    <main className="p-6">
                        <div className="mx-auto max-w-7xl">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}