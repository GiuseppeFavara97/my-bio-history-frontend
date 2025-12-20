import { useState } from "react";

import { motion } from "framer-motion";
import { ClipboardPlus, Notebook } from "lucide-react";
import { Patient, Vaccine } from "@/Types/Types";
import DoctorVaccinesPatientAdd from "./DoctorVaccinesAddModal";

export default function DoctorVaccinesList({ vaccines, selectedPatient }: { vaccines: Vaccine[], selectedPatient?: Patient }) {
    const [toggle, setToggle] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)


    return (
        <div>
            <ClipboardPlus className={`ml-auto duration-700 rounded-full cursor-pointer ${modal && "bg-green-500 ring-1"}`} onClick={() => setModal(true)} />
            {modal && <DoctorVaccinesPatientAdd selectedPatient={selectedPatient} setModal={setModal} />}
            {vaccines.map((vaccine: Vaccine, i: number) => (

                <div className=" flex  items-center border-b  rounded-2xl p-3  gap-5" key={vaccine.id}>
                    <div className="flex flex-col w-50 overflow-auto">
                        <span className="font-bold text-2xl ">{vaccine.name} </span>
                        <p>{vaccine.name} </p>
                    </div>

                    {toggle === true && (<motion.div className="w-full h-full" initial={{ opacity: 0 }} animate={{
                        transition: { duration: 0.5 },

                        opacity: 1
                    }}>
                        <textarea placeholder={vaccine.name} defaultValue={vaccine.name} className="flex resize h-full w-8/10 outline " />
                    </motion.div>)}

                    <Notebook className="ml-auto cursor-pointer hover:scale-120" onClick={() => setToggle(toggle => !toggle)} />

                </div>

            ))}
        </div>
    )

}