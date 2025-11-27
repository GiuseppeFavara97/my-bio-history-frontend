"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "reset" | "done">("email");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3001/api";

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Errore nell'invio del codice.");

      setStep("code");
      setMessage("📩 Codice inviato alla tua email.");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: email, otp: code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Codice errato.");

      setStep("reset");
      setMessage("🔐 Codice corretto! Ora imposta una nuova password.");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        body: JSON.stringify({ contact: email, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Errore nel reset della password.");

      setStep("done");
      setMessage("✅ Password reimpostata con successo! Reindirizzamento...");

      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-950 shadow-lg rounded-2xl p-6 w-full max-w-lg text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Recupera Password</h2>

        {step === "email" && (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Invio in corso..." : "Invia codice"}
            </button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleCodeSubmit}>
            <input
              type="text"
              placeholder="Inserisci il codice ricevuto"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Verifica..." : "Verifica codice"}
            </button>
          </form>
        )}

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
              type="submit"
              className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Salvataggio..." : "Reimposta password"}
            </button>
          </form>
        )}

        {step === "done" && (
          <p className="text-center text-green-400 font-semibold">{message}</p>
        )}

        {message && step !== "done" && (
          <p className="mt-4 text-center text-sm text-gray-400">{message}</p>
        )}
      </div>
    </div>
  );
}
