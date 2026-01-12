import { Patient, AllergyPayload, AllergyFormData, Severity } from "@/Types/Types";
import Select from "react-select";
import { FormEvent, useState } from "react";
import { createAllergyByDoctor } from "@/lib/api/doctor";
import { useDoctor } from "../shared/DoctorProvider";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { Button } from "@/components/ui/button";
import DoctorModalInput from "../ui/DoctorModalInput";
import DoctorModalInputTextArea from "../ui/DoctorModalInputTextArea";
import { toast } from "sonner";

type AllergiespatientAddprops = {
  selectedPatient?: Patient;
  setAddModal: (v: boolean) => void;
  onAllergyChange:()=>void
};

export default function DoctorAllergiesAddModal({ selectedPatient, setAddModal,onAllergyChange }: AllergiespatientAddprops) {
  const options = [
    { value: Severity.LIEVE, label: "Lieve" },
    { value: Severity.MODERATA, label: "Media" },
    { value: Severity.GRAVE, label: "Grave" },
  ] as const;

  const [data, setData] = useState<AllergyFormData>({
    allergen: "",
    reaction: "",
    note: "",
    startDate: new Date(),
    severity: Severity.LIEVE,
  });

  const selected = options.find((option) => option.value === data.severity) ?? null;
  const { doctor } = useDoctor();

  async function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedPatient || !doctor) return;

    const payload: AllergyPayload = {
      ...data,
      medicalRecordId: selectedPatient.medicalRecordId,
      doctorId: doctor.id,
    };

    try {
      await createAllergyByDoctor(payload);
      toast.success("Allergia creata correttamente")
      setAddModal(false);
      onAllergyChange();
    } catch (err) {
      toast.error("errore nella creazioen")
      console.error("errore nell'invio dati", err);
    }
  }

  return (
    <ModalBaseLayout label="Aggiungi Allergia" onClose={() => setAddModal(false)}>
      <form onSubmit={sendData} className="flex flex-col gap-5">
        <DoctorModalInput
          label="Allergene"
          type="text"
          placeholder="Allergene"
          onChange={(e) => setData((prev) => ({ ...prev, allergen: e.target.value }))}
        />

        <DoctorModalInput
          label="Reazioni"
          type="text"
          placeholder="Reazioni"
          onChange={(e) => setData((prev) => ({ ...prev, reaction: e.target.value }))}
        />

        <DoctorModalInput
          label="Data di inizio"
          type="date"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              startDate: new Date(e.target.value),
            }))
          }
        />

        <DoctorModalInputTextArea
          label="Note"
          placeholder="Note"
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
            placeholder="Seleziona una gravità"
            isClearable
          />
        </div>

        <Button type="submit">Aggiungi Allergia</Button>
      </form>
    </ModalBaseLayout>
  );
}
