import { useState } from "react";

import { motion } from "framer-motion";
import { ClipboardPlus, Notebook } from "lucide-react";
import { Patient, Vaccine } from "@/Types/Types";
import DoctorVaccinesPatientAdd from "./DoctorVaccinesAddModal";

export default function DoctorVaccinesList({
  vaccines,
  selectedPatient,
}: {
  vaccines: Vaccine[];
  selectedPatient?: Patient;
}) {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine>();
  const [grab, setGrab] = useState(false);

  console.log(selectedVaccine, "testing");
  return (
    <div className="">
      <ClipboardPlus
        className={`ml-auto cursor-pointer rounded-full duration-700 ${modal && "bg-green-500 ring-1"}`}
        onClick={() => setModal(true)}
      />
      {modal && <DoctorVaccinesPatientAdd selectedPatient={selectedPatient} setModal={setModal} />}
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
            {vaccines.map((vaccine: Vaccine, i: number) => (
              <tr
                onClick={() => setSelectedVaccine(vaccines[i])}
                onMouseDown={()=> setGrab(true)}
                onMouseUp={()=> setGrab(false)}
                className={` border-t text-center hover:cursor-grab hover:bg-gray-600/30 ${grab && "hover:cursor-grabbing"} ${selectedVaccine ? selectedVaccine.id === i + 1 && "bg-green-300" : ""} `}
                key={vaccine.id}
              >
                <td className="border-r hover:bg-green-300">{vaccine.name}</td>
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
