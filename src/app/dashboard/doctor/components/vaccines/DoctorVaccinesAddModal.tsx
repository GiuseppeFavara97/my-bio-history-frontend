import { createVaccineByDoctor } from "@/lib/api/doctor";
import { Patient, VaccinesFormData, VaccinesPayload } from "@/Types/Types";
import { FormEvent, useState } from "react";
import { useDoctor } from "../shared/DoctorProvider";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { Button } from "@/components/ui/button";
import DoctorModalInput from "../ui/DoctorModalInput";
import { toast } from "sonner";

type VaccinesProps = {
  selectedPatient?: Patient;
  setModal: (v: boolean) => void;
  onVaccineChange: () => void;
};

export default function DoctorVaccinesAddModal({ selectedPatient, setModal, onVaccineChange }: VaccinesProps) {
  const [data, setData] = useState<VaccinesFormData>();
  const doctor = useDoctor().doctor;

  async function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedPatient || !doctor) return;
    if (!data) return;

    const payload: VaccinesPayload = {
      ...data,
      medicalRecordId: selectedPatient.medicalRecordId,
      doctorId: doctor.id,
    };

    try {
      await createVaccineByDoctor(payload);
      toast.success("Vaccino aggiunto correttamente")
      onVaccineChange();
    } catch (err) {
      toast.error("Errore creazione vaccino")
      console.error("errore nell'invio dati", err);
    }
  }

  return (
    <ModalBaseLayout label="Aggiunta vaccino" onClose={() => setModal(false)}>
      <form onSubmit={sendData} className="relative flex flex-col gap-5 rounded-2xl bg-white p-5">
        <DoctorModalInput
          label="Nome Vaccino"
          type="text"
          placeholder="Nome"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />

        <DoctorModalInput
          label="Tipo Vaccino"
          type="text"
          placeholder="Tipo"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
        />

        <DoctorModalInput
          label="Somministrato in data"
          type="date"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              vaccinationDate: new Date(e.target.value),
            }))
          }
        />

        <DoctorModalInput
          label="Richiamo"
          type="date"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              vaccinationBooster: new Date(e.target.value),
            }))
          }
        />

        <Button type="submit">Aggiungi Vaccino</Button>
      </form>
    </ModalBaseLayout>
  );
}
