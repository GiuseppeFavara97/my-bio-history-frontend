"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ConfirmCodePage() {
  const params = useSearchParams();
  const router = useRouter();
  const contact = params.get("contact") || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        contact,
        token: otp,
      });

      if (data.ok) {
        setMessage("✅ Codice verificato! Ora puoi reimpostare la password.");
        // Puoi fare il redirect a una pagina di reset password, per esempio:
        // router.push(`/login/reset-password?session=${data.sessionToken}`);
      } else {
        setMessage("❌ Codice non valido. Riprova.");
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.error ?? "Errore nella verifica del codice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-950 shadow-lg rounded-2xl p-6 w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Conferma codice</h2>
        <p className="text-sm text-gray-400 mb-4 text-center">
          Inserisci il codice inviato a <span className="text-blue-400">{contact}</span>
        </p>
        <form onSubmit={handleVerifyCode}>
          <input
            type="text"
            placeholder="Inserisci codice OTP"
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

        {message && (
          <p className="mt-4 text-center text-sm text-gray-400">{message}</p>
        )}
      </div>
    </div>
  );
}
