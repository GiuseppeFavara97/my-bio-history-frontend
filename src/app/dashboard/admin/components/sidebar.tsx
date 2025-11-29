"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (s: boolean) => void;
}) {
    const pathname = usePathname() ?? "/dashboard/admin";
    const router = useRouter();

    const nav = [
        { label: "Dashboard", href: "/dashboard/admin", exact: true },
        { label: "Utenti", href: "/dashboard/admin/users" },
        { label: "Impostazioni", href: "/dashboard/admin/settings" },
    ];

    const handleLogout = () => {
        // Rimuovi il cookie
        document.cookie = "token=; path=/; max-age=0";

        // Redirect al login
        router.push("/");
    };


    return (
        <aside
            className={`fixed z-20 inset-y-0 left-0 w-64 px-4 py-6 border-r bg-white transform transition-transform duration-200 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
        >
            <div className="flex items-center gap-2 mb-8">
                <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center text-primary font-bold">
                    BU
                </div>
                <div>
                    <div className="text-lg font-semibold">Buzz Up</div>
                    <div className="text-sm text-slate-500">Admin</div>
                </div>
            </div>

            <nav className="space-y-1">
                {nav.map((item) => {
                    const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-md px-3 py-2 text-sm font-medium ${active ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-100"}`}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-8 pt-6 border-t">
                <button
                    type="button"
                    className="w-full text-left text-sm text-slate-600 hover:text-slate-900"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}