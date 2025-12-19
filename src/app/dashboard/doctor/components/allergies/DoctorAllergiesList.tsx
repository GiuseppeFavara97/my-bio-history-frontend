import { Allergy, Patient } from "@/Types/Types";
import { motion } from "framer-motion";
import { ClipboardPlus, Notebook } from "lucide-react";
import { useState } from "react";
import DoctorAllergiesPatientAdd from "./DoctorAllergiesAddModal";

export default function DoctorAllergiesList({ allergies, selectedPatient }: { allergies: Allergy[], selectedPatient?: Patient }) {


    const [openNoteId, setOpenNoteId] = useState<number | null>(null);
    const [modal, setModal] = useState<boolean>(false)
    return (
        <div className="">
            <ClipboardPlus className={`ml-auto duration-700 rounded-full cursor-pointer ${modal && "bg-green-500 ring-1"}`} onClick={() => setModal(true)} />
            {modal && <DoctorAllergiesPatientAdd selectedPatient={selectedPatient} setModal={setModal} />}
            {allergies.map((allergy: Allergy, i: number) => (

                <div className=" flex  items-center border-b  rounded-2xl p-3  gap-5" key={allergy.id}>
                    <div className="flex flex-col w-50 overflow-auto">
                        <span className="font-bold text-2xl ">{allergy.allergen} </span>
                        <p>{allergy.reaction} </p>
                    </div>

                    {openNoteId === allergy.id && (<motion.div className="w-full h-full" initial={{ opacity: 0 }} animate={{
                        transition: { duration: 0.5 },

                        opacity: 1
                    }}>
                        <textarea placeholder={allergy.note} defaultValue={allergy.note} className="flex resize h-full w-8/10 outline " />
                    </motion.div>)}

                    <Notebook className="ml-auto cursor-pointer hover:scale-120" onClick={() =>
                        setOpenNoteId(openNoteId === allergy.id ? null : allergy.id)
                    } />

                </div>

            ))}
        </div>)
}