import { Allergy, Patient } from "@/Types/Types";
import { motion } from "framer-motion";
import { ClipboardMinus, ClipboardPlus, Notebook } from "lucide-react";
import { useState } from "react";
import DoctorAllergiesPatientAdd from "./DoctorAllergiesAddModal";
import DoctorAllergiesRemoveModal from "./DoctorAllergiesRemoveModal";


export default function DoctorAllergiesList({
  allergies,
  selectedPatient,
}: {
  allergies: Allergy[];
  selectedPatient?: Patient;
}) {
  const [openNoteId, setOpenNoteId] = useState<number | null>(null);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [removeModal, setRemoveModal] = useState<boolean>(false);
  const [selectedAllergy, setSelectedAllergy] = useState<Allergy>();

 
  return (
    <div className="">
      <div className="group flex justify-end gap-3  ">
        <ClipboardPlus
          className={`hover:scale-120 cursor-pointer rounded-full  duration-700 ${addModal && "bg-green-500 ring-1"}`}
          onClick={() => setAddModal(true)}
        />
        {addModal && <DoctorAllergiesPatientAdd selectedPatient={selectedPatient} setAddModal={setAddModal} />}
      </div>

      {allergies.map((allergy: Allergy, i: number) => (
        <div className=" flex  items-center gap-5  rounded-2xl border-b  p-3" key={allergy.id}>
          <div className="w-50 flex flex-col overflow-auto">
            <span className="text-2xl font-bold ">{allergy.allergen} </span>
            <p>{allergy.reaction} </p>
          </div>

          {openNoteId === allergy.id && (
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{
                transition: { duration: 0.5 },

                opacity: 1,
              }}
            >
              <textarea
                placeholder={allergy.note}
                defaultValue={allergy.note}
                className="w-8/10 flex h-full resize outline "
              />
            </motion.div>
          )}

          <Notebook
            className="hover:scale-120 ml-auto cursor-pointer"
            onClick={() => setOpenNoteId(openNoteId === allergy.id ? null : allergy.id)}
          />
          <ClipboardMinus
            className={`hover:scale-120 cursor-pointer rounded-full duration-700 ${selectedAllergy?.id === allergy.id && removeModal && "bg-red-500 ring-1"}`}
            onClick={() => {
              setSelectedAllergy(allergy);
              setRemoveModal(true);
            }}
          />
          {selectedAllergy?.id === allergy.id && removeModal && (
            <DoctorAllergiesRemoveModal selectedAllergy={selectedAllergy} setRemoveModal={setRemoveModal} />
          )}
        </div>
      ))}
    </div>
  );
}
