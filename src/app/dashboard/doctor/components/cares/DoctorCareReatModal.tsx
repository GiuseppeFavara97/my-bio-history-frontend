import ModalBaseLayout from "../ui/ModalBaseLayout";
import { Care, Patient } from "@/Types/Types";
import DoctorModalReadOnlyField from "../ui/DoctorModalReadOnlyField";
import { Button } from "@/components/ui/button";
import DoctorPatientInfo from "../ui/DoctorPatientInfo";

type Props = {
  selectedCare: Care;
  selectedPatient: Patient;
  setReadModal: (v: boolean) => void;
};

export default function DoctorCareReadModal({ selectedCare, selectedPatient, setReadModal }: Props) {
  return (
    <main className="flex">
      <ModalBaseLayout
        className="justify-center p-8 "
        children2={<DoctorPatientInfo selectedPatient={selectedPatient}></DoctorPatientInfo>}
        label="Dettagli terapia"
        onClose={() => setReadModal(false)}
      >
        <DoctorModalReadOnlyField label="Descrizione" value={selectedCare.description} />

        <DoctorModalReadOnlyField label="Frequenza giornaliera" value={selectedCare.dailyFrequency} />

        <DoctorModalReadOnlyField label="Durata (giorni)" value={selectedCare.durationDays} />

        <Button type="button" onClick={() => setReadModal(false)}>
          Chiudi
        </Button>
      </ModalBaseLayout>
    </main>
  );
}
