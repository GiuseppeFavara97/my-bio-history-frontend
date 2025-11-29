"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: (s: boolean) => void }) {
  const pathname = usePathname() ?? "/dashboard/business";
  const router = useRouter();

  const nav = [
    { label: "Dashboard", href: "/dashboard/business", exact: true },
    { label: "Campagne", href: "/dashboard/business/campaigns" },
    { label: "Contatti", href: "/dashboard/business/products" },
  ];

  const handleLogout = () => {
    // Rimuovi il cookie
    document.cookie = "token=; path=/; max-age=0";

    // Redirect al login
    router.push("/");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-64 transform border-r bg-white px-4 py-6 transition-transform duration-200 ease-in-out ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
    >
      <div className="mb-8 flex items-center gap-2">
        <div className="bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-md font-bold">
          BU
        </div>
        <div>
          <div className="text-lg font-semibold">Buzz Up</div>
          <div className="text-sm text-slate-500">Business</div>
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

      <div className="mt-8 border-t pt-6">
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
