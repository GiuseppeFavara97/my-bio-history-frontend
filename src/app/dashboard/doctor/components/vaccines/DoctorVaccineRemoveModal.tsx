import { Vaccine, VaccinesUpdatePayload } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { FormEvent } from "react";
import { useDoctor } from "../shared/DoctorProvider";
import { softDeleteVaccine } from "@/lib/api/vaccine";
import { Button } from "@/components/ui/button";
import DoctorModalReadOnlyField from "../ui/DoctorModalReadOnlyField";
import { toast } from "sonner";

type DoctorVaccineRemoveModalProps = {
  selectedVaccine: Vaccine;
  setRemoveModal: (v: boolean) => void;
  onVaccineChange: () => void;
};

export default function DoctorVaccineRemoveModal({
  selectedVaccine,
  onVaccineChange,
  setRemoveModal,
}: DoctorVaccineRemoveModalProps) {
  const doctor = useDoctor().doctor;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!doctor) return;

    const payload: VaccinesUpdatePayload = {
      doctorId: doctor.id,
    };

    try {
      await softDeleteVaccine(selectedVaccine.id);
      setRemoveModal(false);
      toast.success("Vaccino rimosso correttamente")
      onVaccineChange();
    } catch (err) {
      toast.error("Errore cancellazione vaccino")
      console.error("Errore cancellazione vaccino", err);
    }
  }

  return (
    <ModalBaseLayout label="Rimuovi vaccino" onClose={() => setRemoveModal(false)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <DoctorModalReadOnlyField label="Nome" value={selectedVaccine.name} />

        <DoctorModalReadOnlyField label="Tipo" value={selectedVaccine.type} />

        <DoctorModalReadOnlyField
          label="Somministrato il"
          value={new Date(selectedVaccine.vaccinationDate).toLocaleDateString()}
        />

        <DoctorModalReadOnlyField
          label="Richiamo"
          value={new Date(selectedVaccine.vaccinationBooster).toLocaleDateString()}
        />

        <Button type="submit">Conferma Cancellazione</Button>
      </form>
    </ModalBaseLayout>
  );
}
