import { DiagnosisFormData, DiagnosisPayload, Patient } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { FormEvent, useState } from "react";
import { useDoctor } from "../shared/DoctorProvider";
import { createDiagnosisByDoctor } from "@/lib/api/doctor";
import { Button } from "@/components/ui/button";
import DoctorModalInput from "../ui/DoctorModalInput";
import DoctorModalInputTextArea from "../ui/DoctorModalInputTextArea";
import { toast } from "sonner";

type DoctorDiagnosisAddModalProps = {
  selectedPatient: Patient;
  setAddModal: (v: boolean) => void;
  onDiagnosisChange: () => void;
};

export default function DoctorDiagnosisAddModal({
  selectedPatient,
  setAddModal,
  onDiagnosisChange,
}: DoctorDiagnosisAddModalProps) {
  const [formData, setFormData] = useState<DiagnosisFormData>({
    pathologyName: "",
    description: "",
  });

  const doctor = useDoctor().doctor;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!doctor) return;
    const payload: DiagnosisPayload = {
      ...formData,
      doctorId: doctor.id,
      medicalRecordId: selectedPatient.medicalRecordId,
    };

    try {
      await createDiagnosisByDoctor(payload);
      toast.success("Diagnosi creata correttamente")
      onDiagnosisChange();
    } catch (err) {
      toast.error("Errore nella creazione")
      console.error("errore nella creazione Diagnosi", err);
    }
  }

  return (
    <ModalBaseLayout label="Aggiunta Diagnosi" onClose={() => setAddModal(false)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <DoctorModalInput
          label="Patologia"
          type="text"
          placeholder="Patologia"
          onChange={(e) => setFormData((prev) => ({ ...prev, pathologyName: e.target.value }))}
        />

        <DoctorModalInputTextArea
          label="Descrizione / note"
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />

        <Button type="submit">Aggiungi Diagnosi</Button>
      </form>
    </ModalBaseLayout>
  );
}
