"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import { ForgotPasswordForm } from "../components/forgot-password/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center justify-center w-10 h-10 rounded-full transition-all border backdrop-blur-md bg-black/5 hover:bg-black/10 border-black/10 text-gray-800 md:bg-white/10 md:hover:bg-white/20 md:border-white/20 md:text-white"
        title="Torna alla Home"
      >
        <Home className="w-6 h-6" />
      </Link>
      {/* Sidebar sinistra (come nel login) */}
      <div className="hidden md:flex w-1/3 bg-[#0f1b2b] text-white flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="Logo"
            className="mb-4"
          />
          <h1 className="text-4xl font-bold">Recupero Password</h1>
          <p className="mt-2 text-gray-300">Ti aiuteremo a rientrare nel tuo account</p>
        </motion.div>
      </div>

      {/* Area del Form */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-8"
        >
          <div className="md:hidden flex justify-center mb-8">
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="Logo"
            />
          </div>
          <ForgotPasswordForm />
        </motion.div>
      </div>
    </div>
  );
}
