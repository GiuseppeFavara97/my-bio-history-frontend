"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

    try {
      await axios.post(`${API_URL}/api/auth/login`, formData, {
        withCredentials: true,
      });
      router.push("/dashboard");
    } catch {
      alert("❌ Credenziali non valide");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-950 shadow-lg rounded-2xl p-6 w-full max-w-lg text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-800 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
          >
            Accedi
          </button>
        </form>

        {/* 🔹 Link per password dimenticata */}
        <p className="mt-3 text-center text-sm">
          <Link href="/forgotpassword" className="text-blue-400 hover:underline">
            Password dimenticata?
          </Link>
        </p>

        {/* 🔹 Link per registrazione */}
        <p className="mt-4 text-center text-sm text-gray-300">
          Non hai un account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Registrati qui
          </Link>
        </p>
      </div>
    </div>
  );
}
