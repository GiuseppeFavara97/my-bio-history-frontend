"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include", // ✅ Importante per cookie
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError((data as any)?.error || "Credenziali non valide");
                return;
            }

            // ✅ Redirect automatico in base al ruolo
            if (data.user.role === "admin") {
                router.push("/dashboard/admin");
            }else router.push("/dashboard/business");
            console.log(data.user.role);
            
        } catch (err) {
            setError("Errore di rete");
            console.error(err);
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
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
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