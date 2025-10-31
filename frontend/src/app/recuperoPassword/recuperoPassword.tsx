"use client";

import { useState } from "react";

export default function forgotpassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "done">("email");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simulazione invio codice
    setStep("code");
    setMessage("Ti abbiamo inviato un codice di verifica (demo).");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simulazione verifica codice
    setStep("done");
    setMessage("Codice corretto! Ora puoi impostare una nuova password (demo).");
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
            >
              Invia codice
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
            >
              Verifica codice
            </button>
          </form>
        )}

        {step === "done" && (
          <p className="text-center text-green-400 font-semibold">
            ✅ Password reimpostata (demo)
          </p>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-gray-400">{message}</p>
        )}
      </div>
    </div>
  );
}
