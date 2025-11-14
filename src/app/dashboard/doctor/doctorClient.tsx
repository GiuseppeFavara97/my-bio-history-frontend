"use client";
import { useEffect, useState } from "react";
import { useSharedData } from "../_shared/SharedData";
import { MedicalRecord, User } from "@/Types/Types";
import AllergyPage from "../allergy/allergy";
import VaccinePage from "../vaccines/page";
import DiagnosesPage from "../diagnoses/page";
import CarePage from "./Care/page";
import Profile from "../components/profile/page";
import DocumentPage from "../documents/page"; // ✅ Import aggiunto

export default function DoctorClient({
  medicalrecord,
  userData,
}: {
  medicalrecord: MedicalRecord;
  userData: User | null;
}) {
  const [user, setUser] = useState<User | null>(userData);
  const [medical, setMedical] = useState<MedicalRecord | null>(medicalrecord);
  const { selectedTab, setDoctorName, setSelectedTab } = useSharedData();

  useEffect(() => {
    setUser(userData);
    if (userData) setDoctorName(userData.firstName);
  }, [userData, setDoctorName]);

  if (!user || !medical) return null;

  return (
    <div className="text-black dark:text-white">
      {selectedTab === "dati" ? (
        <div className="flex-1 p-4">
          <Profile />
        </div>
      ) : selectedTab === "medical" ? (
        <div className="flex-1 p-4 rounded-t">
          <h2 className="text-lg font-semibold mb-3">
            Cartella Clinica Work in Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoField label="Nome Paziente" value={medical.patient.fullName} />
            <InfoField label="Cognome" value={user.lastName} />
            <InfoField label="Indirizzo" value={medical.patient.address} full />
            <InfoField label="Username" value={user.username} />
            <InfoField label="Ruolo" value={user.role} />
          </div>

          <div className="text-center h-full my-10 grid grid-rows-5 gap-4">
            {/* Allergie */}
            <div className="outline rounded-md p-3">
              <h3 className="font-semibold mb-3 text-center my-5">Allergie</h3>
              {/* ...contenuto allergie... */}
            </div>

            {/* Diagnosi */}
            <div className="outline rounded-md p-3">
              <h3 className="font-semibold mb-3 text-center my-5">Diagnosi</h3>
              {/* ...contenuto diagnosi... */}
            </div>

            {/* Terapia */}
            <div className="outline rounded-md p-3">
              <h3 className="font-semibold mb-3 text-center my-5">Terapia</h3>
              {/* ...contenuto terapia... */}
            </div>

            {/* Vaccini */}
            <div className="outline rounded p-3">
              <h3 className="my-5">Vaccini</h3>
              {/* ...contenuto vaccini... */}
            </div>

            {/* ✅ Documenti */}
            <div className="outline rounded-md p-3">
              <h3 className="font-semibold mb-3 text-center my-5">Documenti</h3>
              <button
                onClick={() => setSelectedTab("documents")}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16h8M8 12h8m-8-4h8M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6"
                  />
                </svg>
                Apri Documenti
              </button>
            </div>
          </div>
        </div>
      ) : selectedTab === "diagnoses" ? (
        <div className="flex-1 flex flex-col">
          <DiagnosesPage />
        </div>
      ) : selectedTab === "allergy" ? (
        <AllergyPage />
      ) : selectedTab === "care" ? (
        <CarePage />
      ) : selectedTab === "documents" ? (
        <div className="flex-1 p-4">
          <DocumentPage />
        </div>
      ) : (
        <VaccinePage />
      )}
    </div>
  );
}

function InfoField({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={`flex flex-col ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs uppercase opacity-70">{label}</span>
      <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2 break-all">
        {value}
      </div>
    </div>
  );
}


