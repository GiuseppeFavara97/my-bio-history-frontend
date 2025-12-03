"use client";

import { useState } from "react";

export default function Contatti() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: "",
    consenso: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
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
      console.log("Invio dati al backend...", formData);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          messaggio: formData.messaggio,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Errore dal backend:", data || res.statusText);
        throw new Error(data?.message || "Errore nell'invio del messaggio");
      }

      console.log("✅ Risposta dal backend:", data);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Errore catch frontend:", err);
      alert(err.message || "Errore nell'invio del messaggio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#272B4E] text-white">
      <div className="flex-grow max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Contattaci</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 📞 Info della clinica */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Informazioni di contatto</h2>
            <p><strong>MY-BIO-HISTORY</strong></p>
            <p>Via della Salute 123, 00100 Roma (RM)</p>
            <p>📞 <a href="tel:+390612345678" className="text-blue-400 hover:underline">0923-254658</a></p>
            <p>📧 <a href="mailto:amministrazionemybiohistory@gmail.com" className="text-blue-400 hover:underline">
              amministrazionemybiohistory@gmail.com
            </a></p>
            <p>🕒 Lun–Ven: 08:00–18:00</p>
          </div>

          {/* 📬 Form contatto */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Scrivici un messaggio</h2>
            {submitted ? (
              <div className="text-green-400 font-semibold">
                ✅ Grazie! Ti risponderemo al più presto.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Nome e Cognome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 text-black px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 text-black px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Messaggio</label>
                  <textarea
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full border border-gray-300 text-black px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="inline-flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="consenso"
                      checked={formData.consenso}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                    <span>
                      Acconsento al trattamento dei dati personali come da{" "}
                      <a href="/privacy-policy" target="_blank" className="text-blue-400 underline">
                        Privacy Policy
                      </a>.
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded transition ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  {loading ? 'Invio...' : 'Invia'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
