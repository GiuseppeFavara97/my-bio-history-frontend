"use client";

import { useState } from "react";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<
    "enterIdentifier" | "otp" | "reset" | "done"
  >("enterIdentifier");

  const [identifier, setIdentifier] = useState(""); 
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3001";

  // === STEP 1: INVIO OTP ===
  const handleIdentifierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: identifier }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Errore nell'invio dell'OTP");

      setStep("otp");
      setMessage("📩 Codice OTP inviato! Controlla email o SMS.");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // === STEP 2: VERIFICA OTP ===
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: identifier, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Codice errato");

      setStep("reset");
      setMessage("🔐 Codice verificato! Imposta la nuova password.");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // === STEP 3: RESET PASSWORD ===
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setLoading(false);
      setMessage("❌ Le password non coincidono.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: identifier,
          newPassword: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Errore nel reset.");

      setStep("done");
      setMessage("✅ Password aggiornata! Reindirizzamento...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-950 shadow-lg rounded-2xl p-6 w-full max-w-lg text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Recupera Password
        </h2>

        {/* STEP 1 */}
        {step === "enterIdentifier" && (
          <form onSubmit={handleIdentifierSubmit}>
            <input
              type="text"
              placeholder="Email o numero di telefono"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
            <button
              className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Invio..." : "Invia codice"}
            </button>
          </form>
        )}

        {/* OTP */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Inserisci OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
            <button
              className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Verifico..." : "Verifica OTP"}
            </button>
          </form>
        )}

        {/* RESET */}
        {step === "reset" && (
          <form onSubmit={handleResetSubmit}>
            <input
              type="password"
              placeholder="Nuova password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />

            <input
              type="password"
              placeholder="Conferma nuova password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />

            <button
              className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Salvataggio..." : "Reimposta password"}
            </button>
          </form>
        )}

        {/* DONE */}
        {step === "done" && (
          <p className="text-center text-green-400 font-semibold">
            {message}
          </p>
        )}

        {message && step !== "done" && (
          <p className="mt-4 text-center text-sm text-gray-400">{message}</p>
        )}
      </div>
    </div>
  );
}
