import { getPatientById } from "@/lib/api/patient";
import { getAllergiesByPatientId } from "@/lib/api/allergy";
import { Patient, Allergy } from "../../../../Types/Types";
import DashPatient from "./components/dashPatient";

export default async function DashboardPatientData({ params }: { params: { id: number } }) {
  try {
    const patient: Patient = await getPatientById(Number(params.id));
    const allergies: Allergy[] = await getAllergiesByPatientId(Number(params.id));

    return (
      <DashPatient
        userData={patient.user}
        patientAllergies={allergies}
        patientVaccines={patient.vaccines}
        patientUploads={patient.upload}
        medicalRecord={patient.medicalRecord}
      />
    );
  } catch (error) {
    console.error("Errore nel fetch:", error);
    return <div>Errore nel caricamento dei dati del paziente</div>;
  }
}
