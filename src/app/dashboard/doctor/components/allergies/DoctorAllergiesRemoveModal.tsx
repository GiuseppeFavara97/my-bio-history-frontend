import { softDeleteAllergy } from "@/lib/api/allergy";
import { Allergy } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { Button } from "@/components/ui/button";
import DoctorModalReadOnlyField from "../ui/DoctorModalReadOnlyField";
import { toast } from "sonner";

type AllergyRemoveprops = {
  selectedAllergy: Allergy;
  setRemoveModal: (v: boolean) => void;
  onAllergyChange: () => void;
};

export default function DoctorAllergiesRemoveModal({
  selectedAllergy,
  setRemoveModal,
  onAllergyChange,
}: AllergyRemoveprops) {
  async function softDeletePatch(id: number) {
    try {
      await softDeleteAllergy(id);
      toast.success("Allergia rimossa correttamente");
      setRemoveModal(false);
      onAllergyChange();
    } catch (err) {
      toast.error("Errore nella rimozione");
      console.error("errore cancellazione Allergia", err);
    }
  }

  return (
    <ModalBaseLayout label="Rimuovi allergia" onClose={() => setRemoveModal(false)}>
      <DoctorModalReadOnlyField label="Allergene" value={selectedAllergy?.allergen} />
      <DoctorModalReadOnlyField label="Reazioni" value={selectedAllergy?.reaction} />
      <DoctorModalReadOnlyField
        label="Data di inizio"
        value={selectedAllergy?.startDate ? selectedAllergy.startDate.toLocaleDateString() : "-"}
      />
      <DoctorModalReadOnlyField label="Note" value={selectedAllergy?.note} />
      <DoctorModalReadOnlyField label="Gravità" value={selectedAllergy?.severity} />
      <Button type="button" onClick={() => softDeletePatch(selectedAllergy?.id)}>
        Conferma cancellazione
      </Button>
    </ModalBaseLayout>
  );
}
