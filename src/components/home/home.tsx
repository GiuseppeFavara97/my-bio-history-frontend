import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { FolderOpen, UserRound, Stethoscope, BriefcaseMedical, ClipboardPlus } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-12 lg:grid-cols-2">
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

        <div className="lg:col-span-2">
          <h2 id= "chi-siamo" className="text-2xl font-semibold mb-8">Chi siamo</h2>
          <section className="w-full px-6 py-8 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
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

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-8 text-center">I nostri servizi</h2>
          <section className="w-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-16 lg:px-32 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {[
                {
                  icona: < FolderOpen className="text-6xl text-white mb-4" />,
                  titolo: "Archivio Digitale",
                  testo: "Conserva e organizza in modo sicuro tutti i tuoi documenti medici, referti e prescrizioni in un unico spazio digitale accessibile sempre."
                },
                {
                  icona: < ClipboardPlus className="text-6xl text-white mb-4" />,
                  titolo: "Appuntamenti",
                  testo: "Pianifica e tieni traccia dei tuoi appuntamenti medici, ricevendo promemoria per non dimenticare visite e controlli."
                },
                {
                  icona: < BriefcaseMedical className="text-6xl text-white mb-4" />,
                  titolo: "Esami",
                  testo: "Gestisci e archivia i risultati degli esami diagnostici, con la possibilità di consultarli facilmente quando vuoi."
                },
                {
                  icona: < UserRound className="text-6xl text-white mb-4" />,
                  titolo: "Visita",
                  testo: "Monitora le visite mediche programmate e registra informazioni importanti, per tenere sempre sotto controllo la tua salute."
                },
                {
                  icona: < Stethoscope className="text-6xl text-white mb-4" />,
                  titolo: "Risultati",
                  testo: "Visualizza rapidamente i risultati di analisi e test diagnostici, suddivisi per data e tipologia."
                },
                {
                  icona: < UserRound className="text-6xl text-white mb-4" />,
                  titolo: "Prescrizioni",
                  testo: "Archivia e consulta le prescrizioni mediche, per avere sempre sotto mano le indicazioni terapeutiche e farmaci da assumere."
                }
              ].map((servizio, i) => (
                <Card
                  key={i}
                  className="text-white shadow-lg border-none rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl min-h-[300px] flex flex-col justify-between"
                  style={{ backgroundColor: "#61747b" }}
                >
                  <CardHeader className="flex justify-center">
                    {servizio.icona}
                  </CardHeader>
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
      </div >
    </div >
  )
}

export default Home