import { Diagnosis } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { FormEvent } from "react";
import { softDeleteDiagnosis } from "@/lib/api/diagnosis";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import DoctorModalReadOnlyField from "../ui/DoctorModalReadOnlyField";

type DoctorDiagnosisRemoveModalProps = {
  selectedDiagnosis: Diagnosis;
  setRemoveModal: (v: boolean) => void;
  onDiagnosisChange: () => void;
};

export default function DoctorDiagnosisRemoveModal({
  selectedDiagnosis,
  setRemoveModal,
  onDiagnosisChange,
}: DoctorDiagnosisRemoveModalProps) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await softDeleteDiagnosis(selectedDiagnosis.id);
      toast.success("Diagnosi rimossa");
      onDiagnosisChange();
    } catch {
      toast.error("Errore");
      throw new Error("errore nella rimozione");
    }
  }

  return (
    <ModalBaseLayout label="Rimuovi diagnosi" onClose={() => setRemoveModal(false)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <DoctorModalReadOnlyField label="Patologia" value={selectedDiagnosis.pathologyName} />

        <DoctorModalReadOnlyField label="Descrizione / note" value={selectedDiagnosis.description} />

        <Button type="submit">Rimuovi patologia</Button>
      </form>
    </ModalBaseLayout>
  );
}
