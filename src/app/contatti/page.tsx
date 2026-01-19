"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/navbar/logo";

/* =========================
   NAVBAR
========================= */
function ContattiNav() {
  return (
    <nav className="w-full p-4 shadow-md bg-[#244673]">
      <div className="mx-auto flex items-center justify-between max-w-(--breakpoint-xl) px-4 sm:px-6 lg:px-0 text-white">
        {/* SINISTRA */}
        <div className="flex items-center gap-4">
          <Logo />

          <Link href="/" className="font-semibold hover:text-blue-200">
            Home
          </Link>
        </div>

        {/* DESTRA - ACCEDI */}
        <Link
          href="/auth"
          className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-[#244673] transition"
        >
          Accedi
        </Link>
      </div>
    </nav>
  );
}

/* =========================
   PAGINA CONTATTI
========================= */
export default function Contatti() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: "",
    consenso: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consenso) {
      alert("Devi accettare la Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: formData.nome,
            email: formData.email,
            messaggio: formData.messaggio,
          }),
        }
      );

      if (!res.ok) throw new Error("Errore nell'invio del messaggio");

      setSubmitted(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ContattiNav />

      <main className="flex flex-col min-h-screen">
        {/* INFO */}
        <section className="bg-white text-black py-16 px-4 border-b">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Contattaci
            </h1>

            <h2 className="text-xl font-semibold mb-4">
              Informazioni di contatto
            </h2>

            <p className="font-semibold">MY-BIO-HISTORY</p>
            <p>Via della Salute 123, 00100 Roma (RM)</p>

            <p className="mt-2">
              📞{" "}
              <a
                href="tel:+390923254658"
                className="text-blue-600 hover:underline"
              >
                0923-254658
              </a>
            </p>

            <p>
              📧{" "}
              <a
                href="mailto:amministrazionemybiohistory@gmail.com"
                className="text-blue-600 hover:underline"
              >
                amministrazionemybiohistory@gmail.com
              </a>
            </p>

            <p className="mt-2">🕒 Lun–Ven: 08:00–18:00</p>
          </div>
        </section>

        {/* FORM */}
        <section className="bg-white text-black py-16 px-4 flex-grow">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">
              Scrivici un messaggio
            </h2>

            {submitted ? (
              <p className="text-green-600 font-semibold">
                ✅ Grazie! Ti risponderemo al più presto.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome e Cognome"
                  required
                  className="w-full border px-3 py-2 rounded"
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full border px-3 py-2 rounded"
                  onChange={handleChange}
                />

                <textarea
                  name="messaggio"
                  rows={4}
                  placeholder="Messaggio"
                  required
                  className="w-full border px-3 py-2 rounded"
                  onChange={handleChange}
                />

                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="consenso"
                    onChange={handleChange}
                  />
                  <span>
                    Accetto la{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-blue-600 underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  {loading ? "Invio..." : "Invia"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
