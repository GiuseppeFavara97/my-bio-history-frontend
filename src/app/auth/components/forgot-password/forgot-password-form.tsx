"use client";

import { useState, useRef } from "react";
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

const otpSchema = z.object({
  otp: z.string().length(6, "Il codice deve essere di 6 cifre"),
});

const passwordSchema = z.object({
  newPassword: z.string().min(6, "La password deve avere almeno 6 caratteri"),
  confirmPassword: z.string().min(6, "Conferma la password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Le password non coincidono",
  path: ["confirmPassword"],
});

type EmailValues = z.infer<typeof emailSchema>;
type OtpValues = z.infer<typeof otpSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
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

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    const fullOtp = newDigits.join("");
    otpForm.setValue("otp", fullOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || "";
    }
    setOtpDigits(newDigits);
    otpForm.setValue("otp", newDigits.join(""));
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const onOtpSubmit = async (values: OtpValues) => {
    setOtp(values.otp);
    setStep("password");
  };

  const onPasswordSubmit = async (values: PasswordValues) => {
    setLoading(true);
    try {
      await resetPassword({
        email,
        otp,
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
          {step === "email" && "Recupera password"}
          {step === "otp" && "Inserisci codice OTP"}
          {step === "password" && "Nuova password"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {step === "email" && "Inserisci la tua email per ricevere il codice di reset"}
          {step === "otp" && `Abbiamo inviato un codice a 6 cifre a ${email}`}
          {step === "password" && "Inserisci la tua nuova password"}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {["email", "otp", "password"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              step === s ? "bg-primary text-white" :
              ["email", "otp", "password"].indexOf(step) > i ? "bg-primary/20 text-primary" :
              "bg-gray-200 text-gray-400"
            )}>
              {i + 1}
            </div>
            {i < 2 && <div className={cn(
              "w-8 h-0.5",
              ["email", "otp", "password"].indexOf(step) > i ? "bg-primary/40" : "bg-gray-200"
            )} />}
          </div>
        ))}
      </div>

      {/* Step 1: Email */}
      {step === "email" && (
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
      )}

      {/* Step 2: OTP */}
      {step === "otp" && (
        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium block text-center">Codice OTP</label>
            <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className={cn(
                    "w-12 h-14 text-center text-xl font-bold rounded-lg border-2 bg-background transition-colors focus:outline-none focus:border-primary",
                    otpForm.formState.errors.otp ? "border-destructive" : "border-input"
                  )}
                />
              ))}
            </div>
            {otpForm.formState.errors.otp && (
              <p className="text-xs text-destructive text-center">{otpForm.formState.errors.otp.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={otpDigits.join("").length < 6}
            className="w-full bg-primary text-white p-2 rounded flex items-center justify-center disabled:opacity-50"
          >
            Verifica codice
          </button>
          <button
            type="button"
            onClick={() => { setStep("email"); setOtpDigits(["", "", "", "", "", ""]); }}
            className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Non hai ricevuto il codice? Riprova
          </button>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === "password" && (
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">Nuova Password</label>
            <input
              {...passwordForm.register("newPassword")}
              id="newPassword"
              type="password"
              placeholder="••••••••"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                passwordForm.formState.errors.newPassword && "border-destructive"
              )}
            />
            {passwordForm.formState.errors.newPassword && (
              <p className="text-xs text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Conferma Nuova Password</label>
            <input
              {...passwordForm.register("confirmPassword")}
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                passwordForm.formState.errors.confirmPassword && "border-destructive"
              )}
            />
            {passwordForm.formState.errors.confirmPassword && (
              <p className="text-xs text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
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
