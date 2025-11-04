// pages/contatti.tsx
import { useState } from "react";

export default function Contatti() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: "",
    consenso: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consenso) {
      alert("Devi accettare la Privacy Policy.");
      return;
    }

    // Qui puoi gestire l'invio al server/API
    console.log("Dati inviati:", formData);
    setSubmitted(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Contattaci</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 📞 Info della clinica */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Informazioni di contatto</h2>
          <p><strong>Clinica San Salute</strong></p>
          <p>Via della Salute 123, 00100 Roma (RM)</p>
          <p>📞 <a href="tel:+390612345678" className="text-blue-600 hover:underline">06 12345678</a></p>
          <p>📧 <a href="mailto:info@san-salute.it" className="text-blue-600 hover:underline">info@san-salute.it</a></p>
          <p>🕒 Lun–Ven: 08:00–18:00</p>

          {/* 🗺️ Mappa */}
          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=...TUO_CODICE..."
              width="100%"
              height="250"
              className="rounded shadow"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* 📬 Form contatto */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Scrivici un messaggio</h2>
          {submitted ? (
            <div className="text-green-600 font-semibold">Grazie! Ti risponderemo al più presto.</div>
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
                  className="w-full border border-gray-300 px-3 py-2 rounded"
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
                  className="w-full border border-gray-300 px-3 py-2 rounded"
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
                  className="w-full border border-gray-300 px-3 py-2 rounded"
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
                    <a href="/privacy-policy" target="_blank" className="text-blue-600 underline">Privacy Policy</a>.
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Invia
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
