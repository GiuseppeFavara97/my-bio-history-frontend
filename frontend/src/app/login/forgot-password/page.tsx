"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RecuperoPassword() {
  const [step, setStep] = useState<"enterContact" | "enterOtp" | "resetPassword" | "done">("enterContact");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  // 📩 1️⃣ Invia OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post(`${API_URL}/api/auth/send-otp`, { contact });
      setStep("enterOtp");
      setMessage("Codice OTP inviato. Controlla la tua email o il tuo telefono.");
    } catch (err: any) {
      setMessage(err?.response?.data?.error ?? "Errore invio codice");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 2️⃣ Verifica OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/verify-otp`, { contact, token: otp });
      if (data.ok && data.sessionToken) {
        setSessionToken(data.sessionToken);
        setStep("resetPassword");
        setMessage("Codice verificato. Inserisci la nuova password.");
      } else {
        setMessage("Codice non valido.");
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.error ?? "Errore verifica codice");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 3️⃣ Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionToken) return setMessage("Sessione scaduta, riprova.");

    setLoading(true);
    setMessage(null);

    try {
      await axios.post(`${API_URL}/api/auth/reset-password`, {
        sessionToken,
        newPassword,
      });
      setStep("done");
      setMessage("Password aggiornata. Reindirizzamento alla login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setMessage(err?.response?.data?.error ?? "Errore reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-950 shadow-lg rounded-2xl p-6 w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Recupera password</h2>

        {/* 🔹 Step 1 — Inserisci email o telefono */}
        {step === "enterContact" && (
          <form onSubmit={handleSendOtp}>
            <label className="text-sm text-gray-400">Email o numero di telefono</label>
            <input
              type="text"
              placeholder="es. mario@esempio.it o +393331234567"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-2 rounded"
            >
              {loading ? "Invio..." : "Invia codice"}
            </button>
          </form>
        )}

        {/* 🔹 Step 2 — Inserisci OTP */}
        {step === "enterOtp" && (
          <form onSubmit={handleVerifyOtp}>
            <label className="text-sm text-gray-400">Codice OTP ricevuto</label>
            <input
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-2 rounded"
            >
              {loading ? "Verifica..." : "Verifica codice"}
            </button>
          </form>
        )}

        
        {step === "resetPassword" && (
          <form onSubmit={handleResetPassword}>
            <label className="text-sm text-gray-400">Nuova password</label>
            <input
              type="password"
              placeholder="Nuova password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 py-2 rounded"
            >
              {loading ? "Salvataggio..." : "Imposta password"}
            </button>
          </form>
        )}

        {step === "done" && (
          <p className="text-green-400 text-center">
            ✅ Password aggiornata. Reindirizzamento alla login...
          </p>
        )}

        {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
      </div>
    </div>
  );
}
