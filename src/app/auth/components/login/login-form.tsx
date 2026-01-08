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
            setError(err.response?.data?.error || "Password errata");
            setPassword(""); // svuota la password se errata
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="text-red-600">
                    {error}
                    <div className="mt-2">
                        <a
                            href="/auth/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Password dimenticata?
                        </a>
                    </div>
                </div>
            )}
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
