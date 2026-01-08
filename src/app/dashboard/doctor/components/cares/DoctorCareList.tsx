import { ArrowUp, BookOpen, BookUp, ClipboardEdit, ClipboardMinus, ClipboardPlus, MoveUp } from "lucide-react";
import DoctorToolsSection from "../shared/DoctorToolsSection";
import { useState } from "react";
import { Care, Diagnosis, Patient } from "@/Types/Types";
import DoctorCareAddModal from "./DoctorCareAddModal";
import DoctorCareUpdateModal from "./DoctorCareUpdateModal";
import { toast } from "sonner";
import DoctorCareRemoveModal from "./DoctorCareRemoveModal";
import DoctorCareReadModal from "./DoctorCareReatModal";

type DoctorCareListProps = {
  cares: Care[];
  diagnoses:Diagnosis[]
  selectedPatient?: Patient;
  onCaresChange: () => void;
};
export default function DoctorCareList({ cares,diagnoses, selectedPatient, onCaresChange }: DoctorCareListProps) {
  const [readModal, setReadModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [removeModal, setRemoveModal] = useState<boolean>(false);
  const [selectedCare, setSelectedCare] = useState<Care | null>();

  return (
    <main className="h-full w-full">
      <div className="sticky top-0 z-10 flex justify-end rounded-md  ">
        <div className="flex gap-3 rounded-md bg-gray-700/20 p-1 backdrop-blur-sm duration-700 hover:text-white hover:scale-120">
          <DoctorToolsSection
            active={addModal}
            activeColor="bg-green-500"
            label="Aggiungi"
            icon={ClipboardPlus}
            onClick={() => setAddModal(true)}
          />
          <DoctorToolsSection
            active={updateModal}
            activeColor="bg-green-500"
            label="Modifica"
            icon={ClipboardEdit}
            onClick={() => {
              if (!selectedCare) return toast.error("seleziona una terapia");
              setUpdateModal(true);
            }}
          />
          <DoctorToolsSection
            active={removeModal}
            activeColor="bg-red-500"
            label="Rimuovi"
            icon={ClipboardMinus}
            onClick={() => {
              if (!selectedCare) return toast.error("seleziona una terapia");
              setRemoveModal(true);
            }}
          />
        </div>
      </div>
      {addModal && selectedPatient && (
        <DoctorCareAddModal diagnoses={diagnoses} selectedPatient={selectedPatient} setAddModal={setAddModal} onCaresChange={onCaresChange} />
      )}
      {updateModal && selectedPatient && selectedCare && (
        <DoctorCareUpdateModal
          selectedCare={selectedCare}
          diagnoses={diagnoses}
          setUpdateModal={setUpdateModal}
          onCareChange={onCaresChange}
        />
      )}
      {removeModal && selectedPatient && selectedCare && (
        <DoctorCareRemoveModal
          selectedCare={selectedCare}
          setRemoveModal={setRemoveModal}
          onCareChange={onCaresChange}
        />
      )}
      {readModal && selectedCare && selectedPatient &&<DoctorCareReadModal selectedPatient={selectedPatient} selectedCare={selectedCare} setReadModal={setReadModal} />}
      {cares
        .sort((a, b) => a.id - b.id)
        .map((care: Care, i: number) => (
          <div
            key={care.id}
            className={`relative ml-5 flex rounded-2xl border-b p-3 hover:cursor-pointer hover:bg-green-100/50 ${selectedCare?.id === cares[i].id && "bg-green-200/70 underline"}`}
            onClick={() => {
              if (selectedCare === cares[i]) return setSelectedCare(null);
              setSelectedCare(cares[i]);
            }}
          >
            <div
              className="absolute -left-6 top-1/2 flex cursor-help flex-col font-bold"
              onClick={(e) => {
                e.stopPropagation();
                if (!care) return;
                setSelectedCare(care);
                setReadModal(true);
              }}
            >
              <BookOpen />
            </div>
            <div className="flex flex-col">
              <span className="line-clamp-4 overflow-hidden text-ellipsis text-lg font-semibold">
                {care.description}
              </span>
              <span className="text-sm text-gray-600">Frequenza giornaliera: {care.dailyFrequency}x</span>
              <span className="text-sm text-gray-600">Durata: {care.durationDays} giorni</span>
            </div>
          </div>
        ))}
    </main>
  );
}
