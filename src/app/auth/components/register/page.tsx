"use client";

import dynamic from "next/dynamic";

const RegisterForm = dynamic(() => import("./register-form").then((mod) => mod.RegisterForm), { ssr: false });

export default function Register({ setIsRegister }: { setIsRegister: (value: boolean) => void }) {
  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Crea un account</h2>
          <p className="text-muted-foreground">
            Inserisci i tuoi dati per iniziare a gestire la tua storia clinica.
          </p>
        </div>
        
        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
          <RegisterForm />
          
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground">
              Hai già un account?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-primary font-semibold hover:underline transition-all"
              >
                Accedi
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
