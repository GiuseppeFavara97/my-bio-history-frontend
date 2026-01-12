import { Allergy, AllergyFormData, AllergyUpdatePayload, Severity } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { FormEvent, useState } from "react";
import Select from "react-select";
import { updateAllergyByDoctor } from "@/lib/api/doctor";
import { useDoctor } from "../shared/DoctorProvider";
import { Button } from "@/components/ui/button";
import DoctorModalInput from "../ui/DoctorModalInput";
import DoctorModalInputTextArea from "../ui/DoctorModalInputTextArea";
import { toast } from "sonner";

type DoctorAllergiesUpdateModalProps = {
  selectedAllergy: Allergy;
  setUpdateModal: (v: boolean) => void;
  onAllergyChange: () => void;
};

export default function DoctorAllergiesUpdateModal({
  selectedAllergy,
  setUpdateModal,
  onAllergyChange,
}: DoctorAllergiesUpdateModalProps) {
  const options = [
    { value: Severity.LIEVE, label: "Lieve" },
    { value: Severity.MODERATA, label: "Moderata" },
    { value: Severity.GRAVE, label: "Grave" },
  ] as const;

  const doctor = useDoctor().doctor;

  const [data, setData] = useState<AllergyFormData>({
    allergen: selectedAllergy.allergen,
    reaction: selectedAllergy.reaction,
    note: selectedAllergy.note ?? "",
    startDate: selectedAllergy.startDate ? new Date(selectedAllergy.startDate) : new Date(),
    severity: selectedAllergy.severity,
  });

  const selected = options.find((option) => option.value === data.severity) ?? null;

  async function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!doctor) return;

    try {
      const payload: AllergyUpdatePayload = {
        ...data,
        doctorId: doctor.id,
      };
      await updateAllergyByDoctor(payload, selectedAllergy.id);
      onAllergyChange();
      toast.success("Allergia aggiornata correttamente");

      setUpdateModal(false);
    } catch (err) {
      toast.success("errore nell'aggiornamento");
      console.error("errore aggiornamento allergia", err);
    }
  }

  return (
    <ModalBaseLayout label="Modifica Allergia" onClose={() => setUpdateModal(false)}>
      <form onSubmit={sendData} className="flex flex-col gap-5">
        <DoctorModalInput
          label="Allergene"
          type="text"
          value={data.allergen}
          onChange={(e) => setData((prev) => ({ ...prev, allergen: e.target.value }))}
        />

        <DoctorModalInput
          label="Reazioni"
          type="text"
          value={data.reaction}
          onChange={(e) => setData((prev) => ({ ...prev, reaction: e.target.value }))}
        />

        <DoctorModalInput
          label="Data di inizio"
          type="date"
          value={data.startDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              startDate: new Date(e.target.value),
            }))
          }
        />

        <DoctorModalInputTextArea
          label="Note"
          value={data.note}
          onChange={(e) => setData((prev) => ({ ...prev, note: e.target.value }))}
        />

        <div className="flex flex-col">
          <span className="font-light">Gravità</span>
          <Select
            options={options}
            value={selected}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                severity: e?.value as Severity,
              }))
            }
            isClearable
          />
        </div>

        <Button type="submit">Salva modifiche</Button>
      </form>
    </ModalBaseLayout>
  );
}
