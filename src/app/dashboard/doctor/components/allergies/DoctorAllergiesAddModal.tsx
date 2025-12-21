import { Patient, AllergyPayload, AllergyFormData, Severity } from "@/Types/Types";
import Select from "react-select";
import { FormEvent, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { createAllergyByDoctor } from "@/lib/api/doctor";
import { useDoctor } from "../shared/DoctorProvider";

type AllergiespatientAddprops = {
  selectedPatient?: Patient;
  setAddModal: (v: boolean) => void;
};

export default function DoctorAllergiesAddModal({ selectedPatient, setAddModal }: AllergiespatientAddprops) {
  const options = [
    { value: Severity.LIEVE, label: "Lieve" },
    { value: Severity.MODERATA, label: "Media" },
    { value: Severity.GRAVE, label: "Grave" },
  ] as const;

  const [data, setData] = useState<AllergyFormData>({
    allergen: "",
    reaction: "",
    note: "",
    startDate: new Date(),
    severity: Severity.LIEVE,
  });
  const selected = options.find((option) => option.value === data.severity) ?? null;
  const {doctor} = useDoctor();

  async function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedPatient || !doctor) {
      console.error("Seleziona un paziente prima");
      return;
    }

    if (!data) return;
    const payload: AllergyPayload = {
      ...data,
      medicalRecordId: selectedPatient?.medicalRecord.id,
      doctorId: doctor.id,
    };

    try {
      const sent = await createAllergyByDoctor(payload);
      console.log(payload, "durante invio");
    } catch (err) {
      console.error("errore nell'invio dati", err);
    }
  }

  console.log(doctor, "dottore");
  console.log(data, "da mandare");
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/30">
      <form onSubmit={sendData} className=" relative flex flex-col gap-5 rounded-2xl bg-white p-5 outline">
        <p
          className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full ring-2 hover:bg-red-400 hover:ring-red-800"
          onClick={() => setAddModal(false)}
        >
          <ArrowLeft />{" "}
        </p>
        <span className="text-center">Aggiungi Allergia </span>
        <div className="flex flex-col">
          <span className="font-light ">Allergene</span>
          <input
            type="text"
            placeholder="Allergene"
            className="rounded-full p-1 outline focus:outline-blue-600"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                allergen: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light ">Reazioni</span>
          <input
            type="text"
            placeholder="Reazioni"
            className="rounded-full p-1 outline focus:outline-blue-600"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                reaction: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light ">Data di inizio</span>
          <input
            type="date"
            placeholder="Data"
            className="rounded-full p-1 outline focus:outline-blue-600"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                startDate: new Date(e.target.value),
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light ">Note</span>
          <input
            type="text"
            placeholder="Note"
            className="rounded-full p-1 outline focus:outline-blue-600"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                note: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light ">Gravità</span>
          <Select
            options={options}
            value={selected}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                severity: e?.value as Severity,
              }));
            }}
            placeholder="Seleziona una gravità"
            isClearable
            className="  p-1 focus:outline-blue-600"
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
