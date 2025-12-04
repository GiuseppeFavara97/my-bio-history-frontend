"use client";

import { useEffect } from "react";
import Home from "@/components/home/home";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function HomePage() {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      if (
        event.reason &&
        typeof event.reason.message === "string" &&
        event.reason.message.includes("Could not establish connection")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handler);

    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center bg-[#f4f5f7] p-8">
        <Home />
      </main>
      <Footer />
    </>
  );
}