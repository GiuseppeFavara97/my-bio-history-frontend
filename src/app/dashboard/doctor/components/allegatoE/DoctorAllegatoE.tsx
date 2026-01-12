"use client";
import Image from "next/image";
import { useDoctor } from "../shared/DoctorProvider";
import { Button } from "@/components/ui/button";
import { Search, Square, SquareCheckBig } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getPatientsByDoctorIdFilter } from "@/lib/api/doctor";
import { Patient } from "@/Types/Types";
import AnimatedList from "@/components/AnimatedList";

export default function AllegatoFPreview() {
  const [autoFill, setAutoFill] = useState({
    datiPaziente: false,
    accertamenti: false,
    schedaSanitaria: false,
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState<{
    firstName?: string;
    lastName?: string;
  }>({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const { doctor } = useDoctor();
  const logo = "/logo.png";
  const signature = "ciao";

  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      if (!doctor) return;
      const data = await getPatientsByDoctorIdFilter(doctor.id, search.firstName);
      setPatients(data);
    }
    fetchPatients();
  }, [doctor, search.firstName]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!searchContainerRef.current) return;
      if (!searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(patients, "in allegato");
  return (
    <main className="m-10 flex">
      <aside id="parte sinistra" className="flex-1/2 print-area flex ">
        <div className="flex min-h-[90vh] w-[210mm] flex-col bg-white outline">
          <div className="mx-10 flex flex-col ">
            <header className="flex justify-between">
              <Image src={logo} alt="logo" width={100} height={100} />
              <h1 className="self-end font-bold">SCHEDA DI ACCESSO IN OSPEDALE</h1>
              <p className="m-5 mr-10">Allegato E</p>
            </header>

            <div className="flex flex-col gap-2">
              <p className="mt-5">Caro collega,</p>
              <p className="leading-relaxed">
                Invio in ospedale{" "}
                {selectedPatient?.sex?.toUpperCase() === "F"
                  ? "la paziente "
                  : selectedPatient?.sex?.toUpperCase() === "M"
                    ? "il paziente "
                    : "il/la paziente "}
                <span className="font-bold">
                  {selectedPatient
                    ? `${selectedPatient.firstName} ${selectedPatient.lastName}`
                    : "— Seleziona un paziente"}
                </span>{" "}
                {selectedPatient?.sex?.toUpperCase() === "F"
                  ? "nata il "
                  : selectedPatient?.sex?.toUpperCase() === "M"
                    ? "nato il "
                    : "nato/a il "}
                {selectedPatient && (
                  <span className="font-bold">{new Date(selectedPatient.birthday).toLocaleDateString("it-IT")}</span>
                )}{" "}
                con Codice Fiscale: <span className="wrap-break-word font-bold">{selectedPatient?.taxCode ?? "————"}</span>
              </p>

              <div className="flex flex-col gap-10">
                <section>
                  <span className="font-bold">1.Motivo del ricovero</span>
                </section>
                <section>
                  <span className="font-bold">2.Accertamenti eventualmente effettuati e terapie in atto</span>
                </section>
                <section>
                  <span className="font-bold">3.Dati estratti dalla scehda sanitaria</span>
                </section>
              </div>
            </div>

            <p className="mt-30">
              Sono disponibile, previo contatto telefonico, ad ulteriori consultazioni durante il periodo di ricovero.
              Ti segnalo l'oppurtunità che al termine del ricovero mi sia cortesemente inviata una esauriente relazione
              clinica
            </p>

            <footer className=" my-5 flex  flex-col">
              <div className="my-15 flex justify-between">
                <Image src={signature} alt="Carica Timbro" width={100} height={100} />
                <Image src={signature} alt="Carica Firma" width={100} height={100} />
                <div>
                  Trapani
                  <p className="font-bold">
                    {new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <p className="font-bold">Recapito telefonico</p>
              {doctor?.phoneNumber}
              <p className="font-bold">Email</p>
              {doctor?.firstName}| email Mancante
            </footer>
          </div>
        </div>
      </aside>

      <aside id="parte destra" className="flex-1/2 flex justify-center">
        <div className="gap-15 m-10 flex flex-col">
          <div className="w-130 h-25 flex flex-col gap-2 rounded-2xl bg-[#F1F1F1] p-2 text-center outline ">
            <h1 className="text-xl font-bold">Personalizza il tuo allegato E</h1>
            <div className="flex justify-around">
              <Button>Carica Logo</Button>
              <Button>Carica Timbro</Button>
              <Button>Carica Firma</Button>
            </div>
          </div>
          <div className="w-130 flex flex-col gap-2 rounded-2xl bg-[#F1F1F1] p-2 outline">
            <div className="mx-6">
              <div className="flex flex-col gap-3 p-1">
                <h1 className="text-xl font-bold">Modifica file allegato E</h1>
                <div className="flex justify-between ">
                  <p>{search.firstName === "" ? "seleziona paziente" : search.firstName}</p>
                  <div ref={searchContainerRef} className="relative w-60">
                    <input
                      type="search"
                      className="relative w-full rounded-full px-2 py-1 outline"
                      placeholder="Ricerca paziente"
                      onFocus={() => setSearchOpen(true)}
                      onChange={(e) =>
                        setSearch((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      value={search.firstName ?? ""}
                    />
                    <Search className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2" />
                    {searchOpen && patients && patients.length > 0 && (
                      <div className="absolute z-50 mt-2 w-full rounded-xl border bg-white p-2 shadow-xl">
                        <p className="mb-2 text-xs font-semibold text-gray-600">Pazienti</p>
                        <AnimatedList
                          items={patients.map((p) => `${p.firstName} ${p.lastName}`)}
                          className="w-full! max-h-48 overflow-y-auto "
                          showGradients={false}
                          itemClassName="hover:bg-blue-600! rounded-lg! duration-500 shadow shadow-black! "
                          onItemSelect={(p: Patient, i: number) => {
                            const full = patients[i];
                            setSelectedPatient(full);
                            setSearch({ firstName: `${full.firstName} ${full.lastName}` });
                            setSearchOpen(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex select-none flex-col gap-2 text-sm">
                <div
                  className="flex cursor-pointer items-center gap-1 hover:underline"
                  onClick={() => setAutoFill((prev) => ({ ...prev, datiPaziente: !prev.datiPaziente }))}
                >
                  {autoFill.datiPaziente ? <SquareCheckBig /> : <Square />}
                  <p>Compila automaticamente dati paziente</p>
                </div>

                <div
                  className="flex cursor-pointer items-center gap-1 hover:underline"
                  onClick={() => setAutoFill((prev) => ({ ...prev, accertamenti: !prev.accertamenti }))}
                >
                  {autoFill.accertamenti ? <SquareCheckBig /> : <Square />}
                  <p>Compila automaticamente accertamenti effettuati e terapie</p>
                </div>

                <div
                  className="flex cursor-pointer items-center gap-1 hover:underline"
                  onClick={() => setAutoFill((prev) => ({ ...prev, schedaSanitaria: !prev.schedaSanitaria }))}
                >
                  {autoFill.schedaSanitaria ? <SquareCheckBig /> : <Square />}
                  <p>Compila automaticamente dati scheda sanitaria</p>
                </div>
              </div>
            </div>
            <div className="m-3 flex justify-end gap-3">
              <Button> Esporta in PDF</Button>
              <Button onClick={() => window.print()}> Stampa</Button>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
