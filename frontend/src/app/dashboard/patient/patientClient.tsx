'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSharedData } from '../_shared/SharedData';
import { MedicalRecord, User } from '@/Types/Types';
import AllergyPage from '../allergy/allergy';
import FileManager from '../documents/page';

export default function PatientClient({
  medicalrecord,
  userData,
}: {
  medicalrecord: MedicalRecord[];
  userData: User | null;
}) {
  const [user, setUser] = useState<User | null>(userData);
  const [medical, setMedical] = useState<MedicalRecord[]>(medicalrecord);
  const { selectedTab, setSelectedTab, patientName, setPatientName } = useSharedData();

  useEffect(() => {
    setUser(userData);
    if (userData) {
      setPatientName(userData.firstName);
    }
  }, [userData]);

  if (!user) return null;

  return (
    <div className="flex w-screen text-white">
      {selectedTab === 'dati' ? (
        <div className="flex-1 p-4 outline rounded-t">
          <h2 className="text-lg font-semibold mb-3">I miei dati</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoField label="Nome" value={user.firstName} />
            <InfoField label="Cognome" value={user.lastName} />
            <InfoField label="Email" value={user.email} full />
            <InfoField label="Username" value={user.username} />
            <InfoField label="Ruolo" value={user.role} />
          </div>
        </div>
      ) : selectedTab === 'medical' ? (
        medical.map((folder, i) => (
          <div key={i} className="flex-1 p-4 outline rounded-t">
            <h2 className="text-lg font-semibold mb-3">Cartella Clinica Work in Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoField label="Nome Paziente" value={folder.patient.fullName} />
              <InfoField label="Cognome" value={user.lastName} />
              <InfoField label="Indirizzo" value={folder.patient.address} full />
              <InfoField label="Username" value={user.username} />
              <InfoField label="Ruolo" value={user.role} />
            </div>
          </div>
        ))
      ) : selectedTab === 'documents' ? (
        <div className="flex-1 p-4 outline rounded-t">
          <h2 className="text-lg font-semibold mb-3">📄 Documenti</h2>
          <FileManager />
        </div>
      ) : (
        <AllergyPage />
      )}
    </div>
  );
}

function InfoField({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={`flex flex-col ${full ? 'md:col-span-2' : ''}`}>
      <span className="text-xs uppercase opacity-70">{label}</span>
      <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2 break-all">
        {value}
      </div>
    </div>
  );
}
