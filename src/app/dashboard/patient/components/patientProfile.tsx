import { Edit } from "lucide-react";
import { patient } from "../../../../../Types/Types";
import PatientProfileField from "./patientProfileField";
import { useState } from "react";

export default function PatientProfile({
  userData,
  setMainArea,
}: {
  userData: patient;
  setMainArea: (v: string) => void;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [patientData, setPatientData] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    municipality: userData.municipality,
    province: userData.province,
    tax_code: userData.tax_code,
    sex: userData.sex,
    phone_number: userData.phone_number,
  });
  console.log(patientData);
  return (
    <div className="flex h-full w-full gap-10 p-8">
      <aside className="flex flex-col items-center">
        <img src="/barney.webp" alt="Foto profilo" className="h-40 w-40 rounded-full object-cover shadow-md" />
        <p className="mt-4 text-sm text-gray-600">Prova stampa ID Utente: {userData.user_id}</p>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="relative mb-6 flex border-b pb-4 ">
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold">
              {userData.first_name} {userData.last_name}
            </h1>
            <span className="text-gray-600">
              {userData.municipality}, {userData.province}
            </span>
          </div>
          <Edit
            onClick={() => setEditMode((edit) => !edit)}
            className={`hover:scale-130 absolute right-0 top-0 cursor-pointer rounded-2xl duration-300 ${editMode && "bg-green-400 ring-2"} `}
          />
        </header>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <PatientProfileField
            //PRIMO ESEMPIO per poi compilare tutti gli altri campi con questo stile di onchange Attualmente lascio cosi
              onChange={(e) => setPatientData((old) => ({ ...old, first_name: e.target.value }))}
              editMode={editMode}
              label="Nome"
              value={userData.first_name}
            />
            <PatientProfileField editMode={editMode} label="Cognome" value={userData.last_name} />
            <PatientProfileField
              type="date"
              editMode={editMode}
              label="Data di nascita"
              value={new Date(userData.birthday).toLocaleDateString()}
            />
            <PatientProfileField type="email" editMode={editMode} label="Email" value="(da prendere da user)" />
          </div>

          <div className="space-y-4">
            <PatientProfileField editMode={editMode} label="Luogo di nascita" value={userData.municipality} />
            <PatientProfileField editMode={editMode} label="Provincia" value={userData.province} />
            <PatientProfileField editMode={editMode} label="Codice fiscale" value={userData.tax_code} />
            <PatientProfileField editMode={editMode} label="Sesso" value={userData.sex} />
            <PatientProfileField type="number" editMode={editMode} label="Telefono" value={userData.phone_number} />
          </div>
        </div>
      </div>
    </div>
  );
}
