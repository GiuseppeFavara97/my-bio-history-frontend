"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Trim email/password per rimuovere spazi
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();

            console.log("[Login] Tentativo login con:", {
                email: `${trimmedEmail.substring(0,3)}********`,
                password: `${trimmedPassword.substring(0,0)}********`,
                emailLength: trimmedEmail.length,
                passwordLength: trimmedPassword.length,
            });

            const data = await login(trimmedEmail, trimmedPassword);
            console.log("[Login] Risposta ricevuta dal server:", data);

            const role = data?.role;
            const token = data?.token;

            console.log("[Login] Token ricevuto:", token ? "✓ Presente" : "✗ Mancante");
            console.log("[Login] Role estratto:", role);

            if (!role) {
                throw new Error("Role non trovato nella risposta del server");
            }

            switch (role.toUpperCase()) {
                case "ADMIN":
                    console.log("[Login] Reindirizzamento a /dashboard/admin");
                    router.push("/dashboard/admin");
                    break;
                case "DOCTOR":
                    console.log("[Login] Reindirizzamento a /dashboard/doctor");
                    router.push("/dashboard/doctor");
                    break;
                case "PATIENT":
                    console.log("[Login] Reindirizzamento a /dashboard/patient");
                    router.push("/dashboard/patient");
                    break;
                default:
                    console.warn("[Login] Role sconosciuto:", role);
                    setError(`Ruolo non riconosciuto: ${role}`);
            }
        } catch (err: any) {
            console.error("[Login] Errore catturato:", err);
            let errorMsg = "Errore di rete";

            if (err.response?.data?.error) {
                errorMsg = err.response.data.error;
            } else if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err.response?.status === 401) {
                errorMsg = "Email o password non corretti";
            } else if (err.response?.status === 404) {
                errorMsg = "Utente non trovato";
            } else if (err.message) {
                errorMsg = err.message;
            } else if (!err.response) {
                errorMsg = "Impossibile contattare il server. Verifica che il backend sia in esecuzione.";
            }

            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-600">{error}</div>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
                autoComplete="email"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
                autoComplete="current-password"
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white p-2 rounded"
            >
                {loading ? "Caricamento..." : "Accedi"}
            </button>
        </form>
    );
}