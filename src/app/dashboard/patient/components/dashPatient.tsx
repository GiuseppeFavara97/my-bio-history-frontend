import { User, Allergy, Vaccine, UploadFile, MedicalRecord } from "../../../../../Types/Types";

type DashPatientProps = {
  userData: User;
  patientAllergies: Allergy[];
  patientVaccines: Vaccine[];
  patientUploads: UploadFile[];
  medicalRecord: MedicalRecord;
};

export default function DashPatient({
  userData,
  patientAllergies,
  patientVaccines,
  patientUploads,
  medicalRecord,
}: DashPatientProps) {
  return (
    <div>
      <h1>{userData.name} {userData.surname}</h1>
      <p>Nato il: {new Date(userData.birthDate).toLocaleDateString()}</p>

      <section>
        <h2>Allergie</h2>
        {patientAllergies.map(a => <p key={a.id}>{a.name}</p>)}
      </section>

      <section>
        <h2>Vaccini</h2>
        {patientVaccines.map(v => <p key={v.id}>{v.name}</p>)}
      </section>

      <section>
        <h2>Documenti</h2>
        {patientUploads.map(u => <p key={u.id}>{u.fileName}</p>)}
      </section>

      <section>
        <h2>Cartella Clinica</h2>
        <p>{medicalRecord.description}</p>
      </section>
    </div>
  );
}
