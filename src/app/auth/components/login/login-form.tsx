"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { login } from "@/lib/api/auth";
import { UserRole } from "@/Types/Types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Inserisci un'email valida"),
  password: z.string().min(6, "La password deve avere almeno 6 caratteri"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const data = await login(values.email, values.password);
      // Il ruolo si trova in data.user.role in base al tuo JSON
      const role = data?.user?.role as UserRole;

      if (!role) {
        console.error("[Login] Struttura risposta inattesa:", data);
        throw new Error("Ruolo non trovato nella risposta del server");
      }

      toast.success("Accesso effettuato!");

      // Reindirizzamento in base al ruolo
      switch (role.toUpperCase()) {
        case UserRole.ADMIN:
          router.push("/dashboard/admin");
          break;
        case UserRole.DOCTOR:
          router.push("/dashboard/doctor");
          break;
        case UserRole.PATIENT:
          router.push("/dashboard/patient");
          break;
        default:
          toast.error("Ruolo non riconosciuto: " + role);
      }
    } catch (err: any) {
      console.error("[Login] Dettagli errore 401:", err.response?.data);
      const message = err.response?.data?.message || err.response?.data?.error || "Email o password non corretti";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label 
          htmlFor="email" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="nome@esempio.it"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
            errors.email && "border-destructive focus-visible:ring-destructive"
          )}
          disabled={loading}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label 
          htmlFor="password" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Password
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="••••••••"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
            errors.password && "border-destructive focus-visible:ring-destructive"
          )}
          disabled={loading}
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full active:scale-[0.98]",
          loading && "cursor-not-allowed"
        )}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Attendere...
          </>
        ) : (
          "Accedi"
        )}
      </button>
    </form>
  );
}
