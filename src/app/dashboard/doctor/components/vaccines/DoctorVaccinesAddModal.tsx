import { createVaccineByDoctor } from "@/lib/api/doctor";
import { Doctor, Patient, Vaccine, VaccinesFormData, VaccinesPayload } from "@/Types/Types";
import { ArrowLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import Select from "react-select";
import { useDoctor } from "../shared/DoctorProvider";

type VaccinesProps = {
  selectedPatient?: Patient;
  setModal: (v: boolean) => void;
};

export default function DoctorVaccinesAddModal({ selectedPatient, setModal }: VaccinesProps) {
  const [data, setData] = useState<VaccinesFormData>();
  const doctor = useDoctor().doctor;
  
  async function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedPatient || !doctor) {
      console.error("Seleziona un paziente prima");
      return;
    }

    if (!data) return;
    const payload: VaccinesPayload = {
      ...data,
      medicalRecordId: selectedPatient?.medicalRecord.id,
      doctorId: doctor.id,
    };

    try {
      const sent = await createVaccineByDoctor(payload);
      console.log(payload, "durante invio");
    } catch (err) {
      console.error("errore nell'invio dati", err);
            console.log(payload, "durante invio in catch");

    }
  }
  console.log(selectedPatient?.id,"in addvaccino",selectedPatient?.medicalRecord.id)
  console.log(data)
  
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/30">
      <form onSubmit={sendData} className=" relative flex flex-col gap-5 rounded-2xl bg-white p-5 outline">
        <p
          className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full ring-2 hover:bg-red-400 hover:ring-red-800"
          onClick={() => setModal(false)}
        >
          <ArrowLeft />{" "}
        </p>
        <span className="text-center">Aggiunta Vaccino </span>
        <div className="flex flex-col">
          <span className="font-light ">Nome Vaccino</span>
          <input
            type="text"
            placeholder="Nome"
            className="rounded-full p-1 outline focus:outline-blue-600"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light ">Tipo Vaccino</span>
          <input
            type="text"
            placeholder="Tipo"
            className="rounded-full p-1 outline focus:outline-blue-600"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                type: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light ">Somministrato in data</span>
          <input
            type="date"
            placeholder="Data"
            className="rounded-full p-1 outline focus:outline-blue-600"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                vaccinationDate: new Date(e.target.value),
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light ">Richiamo</span>
          <input
            type="date"
            placeholder="Data"
            className="rounded-full p-1 outline focus:outline-blue-600"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                vaccinationBooster: new Date(e.target.value),
              }));
            }}
          />
        </div>

        <button className="w-30 rounded border" type="submit">
          {" "}
          Aggiungi Allergia
        </button>
      </form>
    </div>
  );
}
