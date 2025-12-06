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
            const data = await login(email, password);
            const role = data.role;

            switch (role) {
                case "ADMIN":
                    router.push("/dashboard/admin");
                    break;
                case "DOCTOR":
                    router.push("/dashboard/doctor");
                    break;
                case "PATIENT":
                    router.push("/dashboard/patient");
                    break;
                default:
                    router.push("/auth");
            }
        } catch (err: any) {
            setError(err.response?.data?.error || "Errore di rete");
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