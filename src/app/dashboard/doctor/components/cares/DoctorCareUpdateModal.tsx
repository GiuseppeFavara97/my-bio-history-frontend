import { Care, Diagnosis } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import DoctorModalInputTextArea from "../ui/DoctorModalInputTextArea";
import DoctorModalInput from "../ui/DoctorModalInput";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateCare } from "@/lib/api/care";
import { useDoctor } from "../shared/DoctorProvider";
import { toast } from "sonner";
import Select from "react-select";

type DoctorCareUpdateModalProps = {
  selectedCare: Care;
  diagnoses: Diagnosis[];
  setUpdateModal: (v: boolean) => void;
  onCareChange: () => void;
};

export default function DoctorCareUpdateModal({
  selectedCare,
  diagnoses,
  setUpdateModal,
  onCareChange,
}: DoctorCareUpdateModalProps) {
  const [formData, setFormData] = useState({
    description: selectedCare.description ?? "",
    dailyFrequency: selectedCare.dailyFrequency ?? 1,
    durationDays: selectedCare.durationDays ?? 1,
    diagnosisId: selectedCare.diagnosisId ?? 0,
  });

  const doctor = useDoctor().doctor;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;

    try {
      const payload = {
        ...formData,
        doctorId: doctor.id,
      };

      await updateCare(selectedCare.id, payload);
      toast.success("Terapia modificata correttamente");
      onCareChange();
      setUpdateModal(false);
    } catch (err) {
      toast.error("Errore nella modifica");
      console.error("errore nella modifica", err);
    }
  };

  const currentDiagnosis = diagnoses.find((d) => d.cares.some((c, i) => c.id === selectedCare.id));

  return (
    <ModalBaseLayout label="Modifica Terapia" onClose={() => setUpdateModal(false)}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <span className="font-semibold">Diagnosi attualmente associata:</span>
        <div className="mb-1 text-sm text-gray-700">
          {currentDiagnosis ? currentDiagnosis.pathologyName : "Nessuna diagnosi associata"}
        </div>

        <span>Modifica Diagnosi associata</span>
        <Select
          options={diagnoses.map((d) => ({ value: d.id, label: d.pathologyName }))}
          value={diagnoses
            .map((d) => ({ value: d.id, label: d.pathologyName }))
            .find((opt) => opt.value === formData.diagnosisId)}
          onChange={(option) => setFormData((prev) => ({ ...prev, diagnosisId: option!.value }))}
        />

        <DoctorModalInputTextArea
          label="Descrizione / Note"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={3}
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

        <Button type="submit">Salva modifiche</Button>
      </form>
    </ModalBaseLayout>
  );
}
