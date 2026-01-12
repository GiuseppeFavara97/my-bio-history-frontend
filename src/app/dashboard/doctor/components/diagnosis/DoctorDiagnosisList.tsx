import { Diagnosis, Patient } from "@/Types/Types";
import { ClipboardEdit, ClipboardMinus, ClipboardPlus } from "lucide-react";
import { useState } from "react";
import DoctorDiagnosisAddModal from "./DoctorDiagnosisAddModal";
import DoctorDiagnosisUpdateModal from "./DoctorDiagnosisUpdateModal";
import { toast } from "sonner";
import DoctorDiagnosisRemoveModal from "./DoctorDiagnosisRemoveModal";
import DoctorToolsSection from "../shared/DoctorToolsSection";

type DoctorDiagnosisListProps = {
  diagnoses: Diagnosis[];
  selectedPatient?: Patient;
  onDiagnosisChange: () => void;
};

export default function DoctorDiagnosisList({
  diagnoses,
  selectedPatient,
  onDiagnosisChange,
}: DoctorDiagnosisListProps) {
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);

  return (
    <main className="h-full w-full">
      <div className="sticky top-0 z-10 flex justify-end rounded-md ">
        <div className="flex gap-3 duration-700 hover:text-white bg-gray-700/20 p-1 backdrop-blur-sm rounded-md hover:scale-120">
          <DoctorToolsSection
            icon={ClipboardPlus}
            label="Aggiungi"
            active={addModal}
            activeColor="bg-green-500"
            onClick={() => setAddModal(true)}
          />

          <DoctorToolsSection
            icon={ClipboardEdit}
            label="Modifica"
            active={updateModal}
            activeColor="bg-green-500"
            onClick={() => {
              if (!selectedDiagnosis) return toast.error("Seleziona una diagnosi");
              setUpdateModal(true);
            }}
          />

          <DoctorToolsSection
            icon={ClipboardMinus}
            label="Rimuovi"
            active={removeModal}
            activeColor="bg-red-500"
            onClick={() => {
              if (!selectedDiagnosis) return toast.error("Seleziona una diagnosi");
              setRemoveModal(true);
            }}
          />
        </div>
      </div>

      {addModal && selectedPatient && (
        <DoctorDiagnosisAddModal
          selectedPatient={selectedPatient}
          setAddModal={setAddModal}
          onDiagnosisChange={onDiagnosisChange}
        />
      )}
      {updateModal && selectedDiagnosis && (
        <DoctorDiagnosisUpdateModal
          selectedDiagnosis={selectedDiagnosis}
          setUpdateModal={setUpdateModal}
          onDiagnosisChange={onDiagnosisChange}
        />
      )}
      {removeModal && selectedDiagnosis && (
        <DoctorDiagnosisRemoveModal
          selectedDiagnosis={selectedDiagnosis}
          setRemoveModal={setRemoveModal}
          onDiagnosisChange={onDiagnosisChange}
        />
      )}

      {diagnoses
        .sort((a, b) => a.id - b.id)
        .map((diagnosis, i) => (
          <div
            key={diagnosis.id}
            onClick={() => {
              if (selectedDiagnosis === diagnoses[i]) return setSelectedDiagnosis(null);
              setSelectedDiagnosis(diagnoses[i]);
            }}
            className={`flex rounded-2xl border-b p-3 hover:cursor-pointer hover:bg-green-100/50 ${
              selectedDiagnosis?.id === diagnoses[i].id && "bg-green-200/70 underline"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{diagnosis.pathologyName}</span>
              <p>{diagnosis.description}</p>
            </div>
          </div>
        ))}
    </main>
  );
}
