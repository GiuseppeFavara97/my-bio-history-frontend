import { CareFormData, Diagnosis, Patient } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { FormEvent, useEffect, useState } from "react";
import { useDoctor } from "../shared/DoctorProvider";
import { Button } from "@/components/ui/button";
import { createCareByDoctor } from "@/lib/api/doctor";
import DoctorModalInput from "../ui/DoctorModalInput";
import DoctorModalInputTextArea from "../ui/DoctorModalInputTextArea";
import { toast } from "sonner";
import Select from "react-select";
import { Label } from "radix-ui";
import path from "path";

type DoctorCareAddModalProps = {
  selectedPatient: Patient;
  diagnoses: Diagnosis[];
  setAddModal: (v: boolean) => void;
  onCaresChange: () => void;
};

export default function DoctorCareAddModal({
  selectedPatient,
  diagnoses,
  setAddModal,
  onCaresChange,
}: DoctorCareAddModalProps) {
  const [formData, setFormData] = useState<CareFormData>({
    description: "",
    dailyFrequency: 1,
    durationDays: 1,
    diagnosisId: 0,
  });

  const doctor = useDoctor().doctor;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!doctor) return;

    try {
      const payload = {
        ...formData,
        doctorId: doctor.id,
        medicalRecordId: selectedPatient.medicalRecordId,
      };
      console.log(payload);
      await createCareByDoctor(payload);
      toast.success("Terapia Creata correttamente");
      onCaresChange();
      setAddModal(false);
    } catch (err) {
      toast.error("errore nella creazione");
      console.error("errore creazione terapia", err);
    }
  }
  return (
    <ModalBaseLayout label="Aggiungi terapia" onClose={() => setAddModal(false)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <span>Associa ad una Diagnosi</span>
        <Select
          options={diagnoses.map((d) => ({ value: d.id, label: d.pathologyName }))}
          
          onChange={(option) => setFormData((prev) => ({ ...prev, diagnosisId: option!.value }))}
        />
        <DoctorModalInputTextArea
          label="Descrizione"
          placeholder="Es. antibiotico 500mg al bisogno"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />

        <DoctorModalInput
          type="number"
          label="Frequenza giornaliera"
          min={1}
          placeholder="es. 2"
          value={formData.dailyFrequency}
          onChange={(e) => setFormData((prev) => ({ ...prev, dailyFrequency: Number(e.target.value) }))}
        />

        <DoctorModalInput
          type="number"
          min={1}
          placeholder="es. 7"
          label="Durata (giorni)"
          value={formData.durationDays}
          onChange={(e) => setFormData((prev) => ({ ...prev, durationDays: Number(e.target.value) }))}
        />

        <Button type="submit">Aggiungi Terapia</Button>
      </form>
    </ModalBaseLayout>
  );
}
