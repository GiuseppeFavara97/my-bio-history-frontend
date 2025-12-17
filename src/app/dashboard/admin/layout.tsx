"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "./components/sidebar";
import AdminHeader from "./components/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="flex">
                <AdminSidebar open={open} setOpen={setOpen} />
                <div className="flex-1 min-h-screen ml-0 sm:ml-64">
                    <AdminHeader setOpen={setOpen} />
                    <main className="p-6">
                        <div className="mx-auto max-w-7xl">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}