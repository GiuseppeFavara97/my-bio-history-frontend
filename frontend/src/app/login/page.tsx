"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      await axios.post(`${API_URL}/api/auth/login`, formData, {
        withCredentials: true,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Errore:", error);
      alert("Credenziali non valide");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 ">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg dark:bg-gray-950">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Accedi
          </button>
        </form>

        {/* Link registrazione */}
        <p className="mt-4 text-center text-sm">
          Non hai un account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Registrati qui
          </a>
        </p>
      </div>
    </div>
  );
}