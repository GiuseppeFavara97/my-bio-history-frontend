"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmailVerificationPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50/50">
      <div className="w-full max-w-md space-y-8 p-8 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center">
          <div className="bg-blue-50 p-4 rounded-full">
            <MailCheck className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Controlla la tua email
          </h1>
          <p className="text-gray-500">
            Abbiamo inviato un link di verifica al tuo indirizzo email. 
            Clicca sul link per completare la registrazione.
          </p>
        </div>

        <div className="pt-4">
          <Button asChild className="w-full">
            <Link href="/auth">
              Torna al Login
            </Link>
          </Button>
        </div>

        <p className="text-sm text-gray-400">
          Non hai ricevuto l&apos;email? Controlla la cartella spam o riprova tra qualche minuto.
        </p>
      </div>
    </div>
  );
}
