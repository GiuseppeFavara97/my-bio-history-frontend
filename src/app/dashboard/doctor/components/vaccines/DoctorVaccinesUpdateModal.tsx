import { useState, FormEvent } from "react";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { Vaccine, VaccinesFormData, VaccinesUpdatePayload } from "@/Types/Types";
import { updateVaccine } from "@/lib/api/vaccine";
import { useDoctor } from "../shared/DoctorProvider";
import { Button } from "@/components/ui/button";
import DoctorModalInput from "../ui/DoctorModalInput";
import { toast } from "sonner";

type DoctorVaccinesUpdateModalProps = {
  selectedVaccine: Vaccine;
  setUpdateVaccineModal: (v: boolean) => void;
  onVaccineChange: () => void;
};

export default function DoctorVaccinesUpdateModal({
  selectedVaccine,
  setUpdateVaccineModal,
  onVaccineChange,
}: DoctorVaccinesUpdateModalProps) {
  const [data, setData] = useState<VaccinesFormData>({
    name: selectedVaccine.name,
    type: selectedVaccine.type,
    vaccinationDate: new Date(selectedVaccine.vaccinationDate),
    vaccinationBooster: selectedVaccine.vaccinationBooster ? new Date(selectedVaccine.vaccinationBooster) : undefined,
  });

  const doctor = useDoctor().doctor;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: VaccinesUpdatePayload = {
      ...data,
      doctorId: doctor?.id,
    };

    try {
      await updateVaccine(selectedVaccine.id, payload);
      toast.success("Vaccino aggiornato correttamente")
      setUpdateVaccineModal(false);
      onVaccineChange();
    } catch (err) {
      toast.error("Errore nell'aggiornamento vaccino")
      console.error("Errore aggiornamento vaccino", err);
    }
  }

  return (
    <ModalBaseLayout label="Aggiorna vaccino" onClose={() => setUpdateVaccineModal(false)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <DoctorModalInput
          label="Nome"
          type="text"
          placeholder="Nome vaccino"
          value={data.name}
          onChange={(e) => setData((prev) => ({ ...prev!, name: e.target.value }))}
        />

        <DoctorModalInput
          label="Tipo"
          type="text"
          placeholder="Tipo vaccino"
          value={data.type}
          onChange={(e) => setData((prev) => ({ ...prev!, type: e.target.value }))}
        />

        <DoctorModalInput
          label="Somministrato il"
          type="date"
          value={data.vaccinationDate ? data.vaccinationDate.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev!,
              vaccinationDate: new Date(e.target.value),
            }))
          }
        />

        <DoctorModalInput
          label="Richiamo"
          type="date"
          value={data.vaccinationBooster ? data.vaccinationBooster.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev!,
              vaccinationBooster: e.target.value ? new Date(e.target.value) : undefined,
            }))
          }
        />

        <Button type="submit">Salva modifiche</Button>
      </form>
    </ModalBaseLayout>
  );
}
