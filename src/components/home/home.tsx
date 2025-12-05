import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-12 lg:grid-cols-2">
        {/* --- SEZIONE HERO --- */}
        <div>
          <h1 className="mt-6 max-w-[17ch] text-4xl font-semibold leading-tight tracking-tighter md:text-5xl xl:text-[3.25rem]">
            Innovazione e sicurezza per la tua salute
          </h1>
          <p className="mt-6 max-w-[60ch] sm:text-lg">
            Gestisci e condividi la tua storia clinica in modo semplice e sicuro con
            My Bio History.
          </p>
        </div>
        <img src="home.png" alt="Home" className="w-full h-auto object-contain" />

        <Separator className="my-12 lg:col-span-2 bg-gray-500" />

        {/* --- SEZIONE CHI SIAMO --- */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-8">Chi siamo</h2>
          <section className="w-full px-6 py-8 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
              {/* Card 1 */}
              <Card
                className="text-white shadow-lg border-none rounded-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl min-h-[280px]"
                style={{ backgroundColor: "#61747b" }}
              >
                <CardHeader>
                  <CardTitle className="text-center text-xl font-semibold">
                    La nostra missione
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-center">
                  La mission di My Bio History è quella di permetterti di raccogliere,
                  attraverso la nostra piattaforma, tutte le tue informazioni sanitarie,
                  e quelle della tua famiglia, in un unico archivio digitale: sicuro,
                  ordinato e sempre facile da consultare, sia per te che per i tuoi cari.
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card
                className="text-white shadow-lg border-none rounded-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl min-h-[280px]"
                style={{ backgroundColor: "#61747b" }}
              >
                <CardHeader>
                  <CardTitle className="text-center text-xl font-semibold">
                    La nostra storia
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-center">
                  My Bio History nasce dall’idea che prendersi cura della salute sia un
                  gesto di affetto concreto e quotidiano. L’app vuole portare ordine nella
                  gestione di documenti medici, referti e prescrizioni, evitando che si
                  perdano tra cassetti o file del telefono. Mantenere tutto organizzato è
                  un modo semplice ma fondamentale per proteggere chi amiamo, perché anche
                  i piccoli gesti fanno la differenza.
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        <Separator className="my-12 lg:col-span-2 bg-gray-500" />

        {/* --- SEZIONE SERVIZI --- */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-8 text-center">I nostri servizi</h2>
          <section className="w-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-16 lg:px-32 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">

              {/* Esempio di card servizi */}
              {[
                {
                  titolo: "La nostra missione",
                  testo: "La mission di My Bio History è quella di permetterti di raccogliere, attraverso la nostra piattaforma, tutte le tue informazioni sanitarie, e quelle della tua famiglia, in un unico archivio digitale: sicuro, ordinato e sempre facile da consultare."
                },
                {
                  titolo: "La nostra storia",
                  testo: "My Bio History nasce dall’idea che prendersi cura della salute sia un gesto di affetto concreto e quotidiano. L’app vuole portare ordine nella gestione di documenti medici, referti e prescrizioni, evitando che si perdano tra cassetti o file del telefono."
                },
                {
                  titolo: "Il nostro impegno",
                  testo: "Ci impegniamo ogni giorno per migliorare la tua esperienza con My Bio History, offrendo una piattaforma aggiornata, sicura e facile da usare."
                },
                {
                  titolo: "I nostri valori",
                  testo: "Trasparenza, sicurezza e semplicità sono i valori che guidano ogni nostra scelta. Crediamo che la salute debba essere accessibile e protetta."
                },
                {
                  titolo: "Supporto dedicato",
                  testo: "Offriamo un supporto dedicato per rispondere a ogni esigenza e garantire che l’esperienza su My Bio History sia fluida e soddisfacente."
                },
                {
                  titolo: "Innovazione continua",
                  testo: "L’innovazione è al centro del nostro lavoro: miglioriamo costantemente la piattaforma per offrirti strumenti sempre più utili e sicuri."
                }
              ].map((servizio, i) => (
                <Card
                  key={i}
                  className="text-white shadow-lg border-none rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl min-h-[300px] flex flex-col justify-between"
                  style={{ backgroundColor: "#61747b" }}
                >
                  <CardHeader>
                    <CardTitle className="text-center text-lg font-semibold">
                      {servizio.titolo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-center">
                    {servizio.testo}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home