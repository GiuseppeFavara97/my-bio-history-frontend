"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { forgotPassword, resetPassword } from "@/lib/api/auth";
import { cn } from "@/lib/utils";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const emailSchema = z.object({
  email: z.string().email("Inserisci un'email valida"),
});

const resetSchema = z.object({
  otp: z.string().length(6, "Il codice deve essere di 6 cifre"),
  newPassword: z.string().min(6, "La password deve avere almeno 6 caratteri"),
  confirmPassword: z.string().min(6, "Conferma la password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Le password non coincidono",
  path: ["confirmPassword"],
});

type EmailValues = z.infer<typeof emailSchema>;
type ResetValues = z.infer<typeof resetSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
  });

  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
  });

  const onEmailSubmit = async (values: EmailValues) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      setEmail(values.email);
      setStep("otp");
      toast.success("Codice OTP inviato alla tua email");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Errore durante l'invio dell'email");
    } finally {
      setLoading(false);
    }
  };

  const onResetSubmit = async (values: ResetValues) => {
    setLoading(true);
    try {
      await resetPassword({
        email,
        otp: values.otp,
        newPassword: values.newPassword,
      });
      toast.success("Password resettata con successo!");
      router.push("/auth");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Codice non valido o scaduto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">
          {step === "email" ? "Recupera password" : "Inserisci codice"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {step === "email" 
            ? "Inserisci la tua email per ricevere il codice di reset" 
            : `Abbiamo inviato un codice a ${email}`}
        </p>
      </div>

      {step === "email" ? (
        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              {...emailForm.register("email")}
              id="email"
              type="email"
              placeholder="nome@esempio.it"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                emailForm.formState.errors.email && "border-destructive"
              )}
            />
            {emailForm.formState.errors.email && (
              <p className="text-xs text-destructive">{emailForm.formState.errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white p-2 rounded flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Invia codice"}
          </button>
        </form>
      ) : (
        <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-medium">Codice OTP</label>
            <input
              {...resetForm.register("otp")}
              id="otp"
              type="text"
              placeholder="123456"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-center tracking-widest",
                resetForm.formState.errors.otp && "border-destructive"
              )}
            />
            {resetForm.formState.errors.otp && (
              <p className="text-xs text-destructive">{resetForm.formState.errors.otp.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">Nuova Password</label>
            <input
              {...resetForm.register("newPassword")}
              id="newPassword"
              type="password"
              placeholder="••••••••"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                resetForm.formState.errors.newPassword && "border-destructive"
              )}
            />
            {resetForm.formState.errors.newPassword && (
              <p className="text-xs text-destructive">{resetForm.formState.errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Conferma Nuova Password</label>
            <input
              {...resetForm.register("confirmPassword")}
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                resetForm.formState.errors.confirmPassword && "border-destructive"
              )}
            />
            {resetForm.formState.errors.confirmPassword && (
              <p className="text-xs text-destructive">{resetForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white p-2 rounded flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Reset Password"}
          </button>
        </form>
      )}

      <div className="text-center">
        <Link href="/auth" className="text-sm text-primary flex items-center justify-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Torna al login
        </Link>
      </div>
    </div>
  );
}
