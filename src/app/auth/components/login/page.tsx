"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginForm = dynamic(() => import("./login-form").then((mod) => mod.LoginForm), { ssr: false });

export default function Login({ setIsRegister }: { setIsRegister: (value: boolean) => void }) {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  useEffect(() => {
    if (verified === "true") {
      toast.success("Email verificata con successo!", {
        duration: 5000,
      });
    }
  }, [verified]);
  return (
    <div className="flex h-dvh">
      <div className="  flex w-full items-center justify-center lg:w-2/3">
        <div className="w-full max-w-md space-y-10 p-2 lg:py-25 outline rounded-2xl bg-gray-500/10">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight">My Bio History</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              Bentornato! Accedi al tuo account per continuare a esplorare le funzionalità di My Bio History.
            </div>
          </div>
          <div className="space-y-4">
            <LoginForm />
            <p className="text-muted-foreground text-center text-xs">
              Non hai un account?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-primary cursor-pointer duration-300 hover:translate-x-2 hover:scale-110 hover:font-bold hover:underline"
              >
                Registrati ora!
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}