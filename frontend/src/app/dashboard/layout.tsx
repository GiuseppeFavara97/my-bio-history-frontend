import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardProvider } from "./_shared/SharedData";
import Sidebar from "./patient/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("auth_token")?.value;
  if (!token) redirect("/login");
  return (
    <DashboardProvider>
      <div className="flex-1 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-slate-950 dark:to-gray-950 w-full ">
        <div className="flex w-full  ">
          <main className="p-0.5 w-full flex-1 "> {children} </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
