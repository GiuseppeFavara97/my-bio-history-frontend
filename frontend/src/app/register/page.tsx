"use client";

import { useState } from "react";
import axios from "axios";

type Role = "patient" | "doctor";
type Sex = "M" | "F" | "O" | "";

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  birthdayPlace: string;
  province: string;
  sex: Sex;
  phoneNumber: string;
  role: Role;
  doctor?: {
    specializer: string;
    licenseNumber: string;
  };
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
    birthdayPlace: "",
    province: "",
    sex: "",
    phoneNumber: "",
    role: "patient",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      formData.role === "doctor" &&
      (name === "specializer" || name === "licenseNumber")
    ) {
      setFormData((prev) => ({
        ...prev,
        doctor: {
          ...prev.doctor,
          [name]: value,
        } as RegisterFormData["doctor"],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      await axios.post(`${API_URL}/api/users/create`, formData, {
        withCredentials: true,
      });
      alert("Registrazione avvenuta con successo!");
    } catch (error) {
      console.error("Errore:", error);
      alert("Errore durante la registrazione");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg dark:bg-zinc-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrazione</h2>

        <form onSubmit={handleSubmit}>
          {/* campi base */}
          <input
            type="text"
            name="firstName"
            placeholder="Nome"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Cognome"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
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
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="birthdayPlace"
            placeholder="Luogo di nascita"
            value={formData.birthdayPlace}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="text"
            name="province"
            placeholder="Provincia"
            value={formData.province}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">Sesso</option>
            <option value="M">Maschio</option>
            <option value="F">Femmina</option>
            <option value="O">Altro</option>
          </select>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Numero di telefono"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="patient">Paziente</option>
            <option value="doctor">Medico</option>
          </select>

          {/* campi extra medico */}
          {formData.role === "doctor" && (
            <>
              <input
                type="text"
                name="specializer"
                placeholder="Specializzazione"
                value={formData.doctor?.specializer || ""}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="licenseNumber"
                placeholder="Numero licenza"
                value={formData.doctor?.licenseNumber || ""}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
}