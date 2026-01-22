import { Allergy, Patient } from "@/Types/Types"
import ModalBaseLayout from "../ui/ModalBaseLayout";
import DoctorPatientInfo from "../ui/DoctorPatientInfo";
import { Button } from "@/components/ui/button";
import DoctorModalReadOnlyField from "../ui/DoctorModalReadOnlyField";



type DoctorAllergiesReadModalProps = {
    selectedAllergy: Allergy,
    selectPatient: Patient,
    setReadModal: (v: boolean) => void;

}


export default function DoctorAllergiesReadModal({ selectedAllergy, selectPatient, setReadModal }: DoctorAllergiesReadModalProps) {

    return (
        <main>
            <ModalBaseLayout
                label="Test"
                onClose={() => setReadModal(false)}
                children2={<DoctorPatientInfo selectedPatient={selectPatient}></DoctorPatientInfo>}
            >
                <DoctorModalReadOnlyField label="Allergene" value={selectedAllergy.allergen} />
                <DoctorModalReadOnlyField label="Reazione" value={selectedAllergy.reaction} />
                <Button type="button" onClick={() => setReadModal(false)} >Chiudi</Button>
            </ModalBaseLayout>
        </main>
    )
}