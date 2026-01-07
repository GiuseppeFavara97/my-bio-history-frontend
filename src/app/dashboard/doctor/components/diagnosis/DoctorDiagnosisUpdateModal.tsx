import { Diagnosis, DiagnosisFormData, DiagnosisUpdatePayload } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { FormEvent, useState } from "react";
import { updateDiagnosisByDoctor } from "@/lib/api/doctor";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import DoctorModalInput from "../ui/DoctorModalInput";
import DoctorModalInputTextArea from "../ui/DoctorModalInputTextArea";

type DoctorDiagnosisUpdateModalProps = {
  selectedDiagnosis: Diagnosis;
  setUpdateModal: (v: boolean) => void;
  onDiagnosisChange: () => void;
};

export default function DoctorDiagnosisUpdateModal({
  selectedDiagnosis,
  setUpdateModal,
  onDiagnosisChange,
}: DoctorDiagnosisUpdateModalProps) {
  const [formData, setFormData] = useState<DiagnosisFormData>({
    pathologyName: selectedDiagnosis.pathologyName,
    description: selectedDiagnosis.description ?? "Descrizione",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: DiagnosisUpdatePayload = {
      ...formData,
    };

    try {
      await updateDiagnosisByDoctor(payload, selectedDiagnosis.id);
      toast.success("Modifica effettuata");
      onDiagnosisChange();
    } catch {
      toast.error("Errore nella modifica");
    }
  }

  return (
    <ModalBaseLayout label="Modifica patologia" onClose={() => setUpdateModal(false)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <DoctorModalInput
          label="Patologia"
          type="text"
          value={formData.pathologyName}
          placeholder={selectedDiagnosis.pathologyName}
          onChange={(e) => setFormData((prev) => ({ ...prev, pathologyName: e.target.value }))}
        />

        <DoctorModalInputTextArea
          label="Descrizione / note"
          value={formData.description}
          placeholder={selectedDiagnosis.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />

        <Button type="submit">Modifica patologia</Button>
      </form>
    </ModalBaseLayout>
  );
}
