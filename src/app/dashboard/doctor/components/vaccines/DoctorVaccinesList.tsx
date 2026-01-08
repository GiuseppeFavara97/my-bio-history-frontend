import { useState } from "react";

import { motion } from "framer-motion";
import { ClipboardEdit, ClipboardMinus, ClipboardPlus, Notebook } from "lucide-react";
import { Patient, Vaccine } from "@/Types/Types";
import DoctorVaccinesPatientAdd from "./DoctorVaccinesAddModal";
import DoctorVaccinesUpdateModal from "./DoctorVaccinesUpdateModal";
import DoctorVaccineRemoveModal from "./DoctorVaccineRemoveModal";

export default function DoctorVaccinesList({
  vaccines,
  selectedPatient,
  onVaccineChange,
}: {
  vaccines: Vaccine[];
  selectedPatient?: Patient;
  onVaccineChange: () => void;
}) {
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine>();

  const [addModal, setAddModal] = useState<boolean>(false);
  const [updateVaccineModal, setUpdateVaccineModal] = useState<boolean>(false);
  const [removeVaccineModal, setRemoveVaccineModal] = useState<boolean>(false);

  console.log(selectedVaccine, "testing");
  return (
    <div className="">
      <div className="flex justify-end">
        <div className="group relative">
          <ClipboardPlus
            className={` cursor-pointer rounded-full duration-700 ${addModal && "bg-green-500 ring-1"}`}
            onClick={() => setAddModal(true)}
          />
          <span
            className={`duration-600 pointer-events-none absolute -z-20
                      rounded bg-black px-2 py-1 text-xs text-white 
                     opacity-0 group-hover:-translate-y-12 group-hover:opacity-100 `}
          >
            Aggiungi
          </span>
        </div>

        <div className="group  relative">
          <ClipboardEdit
            className={`cursor-pointer rounded-full duration-700 ${updateVaccineModal && "bg-green-500 ring-1"}`}
            onClick={() => setUpdateVaccineModal(true)}
          />
          <span
            className={`duration-600 pointer-events-none absolute -z-20
                      rounded bg-black px-2 py-1 text-xs text-white 
                     opacity-0 group-hover:-translate-y-12 group-hover:opacity-100 `}
          >
            Modifica
          </span>
        </div>
        <div className="group  relative ">
          <ClipboardMinus
            className={`cursor-pointer rounded-full duration-700 ${removeVaccineModal && "bg-green-500 ring-1"}`}
            onClick={() => setRemoveVaccineModal(true)}
          />
          <span
            className={`duration-600 pointer-events-none absolute -z-20
                      rounded bg-black px-2 py-1 text-xs text-white 
                     opacity-0 group-hover:-translate-y-12 group-hover:opacity-100 `}
          >
            Rimuovi
          </span>
        </div>
      </div>
      {addModal && <DoctorVaccinesPatientAdd selectedPatient={selectedPatient} setModal={setAddModal} onVaccineChange={onVaccineChange} />}
      {updateVaccineModal && selectedVaccine && (
        <DoctorVaccinesUpdateModal
          onVaccineChange={onVaccineChange}
          selectedVaccine={selectedVaccine}
          setUpdateVaccineModal={setUpdateVaccineModal}
        />
      )}
      {removeVaccineModal && selectedVaccine && (
        <DoctorVaccineRemoveModal
          onVaccineChange={onVaccineChange}
          selectedVaccine={selectedVaccine}
          setRemoveModal={setRemoveVaccineModal}
        />
      )}
      
      
      <div className="border-3 rounded-md  ">
        <table className=" w-full rounded-2xl bg-white">
          <thead className="border-b text-center">
            <tr className="">
              <th className="border-r">Nome</th>
              <th className="border-r">Tipo</th>
              <th className="border-r">Somministrato il</th>
              <th className="border-l">Richiamo per il</th>
            </tr>
          </thead>
          <tbody className="">
            {vaccines
              .sort((a, b) => a.id - b.id)
              .map((vaccine: Vaccine, i: number) => (
                <tr
                  onClick={() => setSelectedVaccine(vaccines[i])}
                  className={` border-t text-center hover:cursor-pointer hover:bg-gray-600/30 ${selectedVaccine ? selectedVaccine.id === vaccine.id && "bg-green-300" : ""} `}
                  key={vaccine.id}
                >
                  <td className="border-r hover:bg-green-300">
                    {vaccine.name} {i}
                  </td>
                  <td className="border-r hover:bg-green-300">{vaccine.type}</td>
                  <td className="border-r hover:bg-green-300">
                    {vaccine.vaccinationDate ? new Date(vaccine.vaccinationDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="border-l hover:bg-green-300">
                    {vaccine.vaccinationBooster ? new Date(vaccine.vaccinationBooster).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
