"use client";

import Link from "next/link";
import { MailCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function EmailVerificationPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f4f5f7]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md space-y-8 p-8 text-center bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="flex justify-center">
          <div className="bg-primary/10 p-4 rounded-full">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Controlla la tua email
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Abbiamo inviato un link di verifica al tuo indirizzo email. 
            Clicca sul link contenuto nel messaggio per attivare il tuo account.
          </p>
        </div>

        <div className="pt-4">
          <Button asChild className="w-full h-11 rounded-xl text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Link href="/auth">
              Torna al Login
            </Link>
          </Button>
        </div>

        <div className="pt-2">
          <Link 
            href="/auth" 
            className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft size={14} /> Torna indietro
          </Link>
        </div>

        <p className="text-xs text-gray-400 border-t pt-6">
          Non hai ricevuto l&apos;email? Controlla la cartella <strong>spam</strong> o attendi qualche minuto prima di riprovare.
        </p>
      </motion.div>
    </div>
  );
}
