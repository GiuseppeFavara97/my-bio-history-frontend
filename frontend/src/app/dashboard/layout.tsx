import React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import ClientLayout from "../clientlayout";
import Footer from "../../components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <main className="p-4">{children}</main>
      <Footer/>
    </div>
  )
}