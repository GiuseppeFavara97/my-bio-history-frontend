import Link from "next/link";
import Image from 'next/image'

import { LoginForm } from "./components/login-form";

export default function Login() {
  return (
    <div className="flex h-dvh">
      

      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
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
              <Link href="register" className="text-primary">
                Registrati ora!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}