import { Care } from "@/Types/Types";
import ModalBaseLayout from "../ui/ModalBaseLayout";
import { Button } from "@/components/ui/button";
import DoctorModalReadOnlyField from "../ui/DoctorModalReadOnlyField";
import { softDeleteCare } from "@/lib/api/care";
import { toast } from "sonner";

type DoctorCareRemoveModalProps = {
  selectedCare: Care;
  setRemoveModal: (v: boolean) => void;
  onCareChange: () => void;
};

export default function DoctorCareRemoveModal({
  selectedCare,
  setRemoveModal,
  onCareChange,
}: DoctorCareRemoveModalProps) {
  async function handleDelete() {
    try {
      await softDeleteCare(selectedCare.id);
      toast.success("Terapia rimossa")
      onCareChange();
      setRemoveModal(false);
    } catch (err) {
        toast.error("Errore nella rimozione")
      console.error("Errore cancellazione terapia", err);
    }
  }

  return (
    <ModalBaseLayout label="Rimuovi terapia" onClose={() => setRemoveModal(false)}>
      <div className="flex flex-col gap-3">
        <DoctorModalReadOnlyField label="Descrizione / Note" value={selectedCare.description} />

        <DoctorModalReadOnlyField label="Frequenza giornaliera" value={selectedCare.dailyFrequency} />

        <DoctorModalReadOnlyField label="Durata (giorni)" value={selectedCare.durationDays} />

        <Button type="button" onClick={handleDelete}>
          Conferma cancellazione
        </Button>
      </div>
    </ModalBaseLayout>
  );
}
