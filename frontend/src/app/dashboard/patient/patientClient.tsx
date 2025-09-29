'use client'
import { useEffect, useState } from 'react'
import { useSharedData } from '../_shared/SharedData';
import { MedicalRecord, User } from '@/Types/Types';
import AllergyPage from '../allergy/allergy';
import VaccinePage from '../vaccines/page';
import DiagnosesPage from '../diagnoses/page';
import CarePage from '../Care/page';
import Profile from '../components/profile/page';



export default function PatientClient({
    medicalrecord,
    userData,
}: {
    medicalrecord: MedicalRecord[]
    userData: User | null
}) {
    const [user, setUser] = useState<User | null>(userData)
    const [medical, setMedical] = useState<any>(medicalrecord)
    const {selectedTab,setSelectedTab,patientName,setPatientName} = useSharedData();

    useEffect(() => {
        setUser(userData)
        if (userData) setPatientName(userData.firstName)
    }, [userData, setPatientName])

    if (!user) return null;

    return (
        <div className='h-full text-white'>
            {selectedTab === "dati" ? (
                
                <div className="flex-1 p-4">
                <Profile/>
                    </div>
            ) : selectedTab === "medical" ? (
                medical.map((folder:MedicalRecord, i:number) => (
                    <div key={i} className="h-full p-4 rounded-t">
                        <h2 className="text-lg font-semibold mb-3">Cartella Clinica Work in Progress</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <InfoField label="Nome Paziente" value={folder.patient.fullName} />
                            <InfoField label="Cognome" value={user.lastName} />
                            <InfoField label="Indirizzo" value={folder.patient.address} full />
                            <InfoField label="Username" value={user.username} />
                            <InfoField label="Ruolo" value={user.role} />
                        </div>
                        <div className='text-center h-full my-10 grid grid-rows-4 gap-1'>
                            <div className="outline rounded-md p-3">
                                <h3 className="font-semibold mb-3 text-center my-5">Allergie</h3>
                                {folder.allergies && folder.allergies.length > 0 ? (
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-600">
                                                <th className="p-2">#</th>
                                                <th className="p-2">Allergene</th>
                                                <th className="p-2">Note</th>
                                                <th className="p-2">Reazione</th>
                                                <th className="p-2">Gravità</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {folder.allergies.map((allergy, idx) => (
                                                <tr key={allergy.id} className="border-b border-gray-700">
                                                    <td className="p-2">{idx + 1}</td>
                                                    <td className="p-2">{allergy.allergen}</td>
                                                    <td className="p-2">{allergy.note}</td>
                                                    <td className="p-2">{allergy.reaction}</td>
                                                    <td className="p-2">{allergy.severity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-sm opacity-70 text-center">
                                        Nessuna allergia registrata
                                    </p>
                                )}
                            </div>
                            <div className="outline rounded-md p-3">
                                <h3 className="font-semibold mb-3 text-center my-5">Diagnosi</h3>
                                {folder.diagnoses && folder.diagnoses.length > 0 ? (
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-600">
                                                <th className="p-2">#</th>
                                                <th className="p-2">Nome patologia</th>
                                                <th className="p-2">Descrizione</th>
                                                <th className="p-2">Data di aggiunta</th>
                                                <th className="p-2">Data di modifica</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {folder.diagnoses.map((diagnosis, idx) => (
                                                <tr key={diagnosis.id} className="border-b border-gray-700">
                                                    <td className="p-2">{idx + 1}</td>
                                                    <td className="p-2">{diagnosis.pathologyName}</td>
                                                    <td className="p-2">{diagnosis.description}</td>
                                                    <td className="p-2">{diagnosis.createdAt}</td>
                                                    <td className="p-2">{diagnosis.updatedAt}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-sm opacity-70 text-center">
                                        Nessuna diagnosi registrata
                                    </p>
                                )}
                            </div> 
                            <div className="outline rounded-md p-3">
                                <h3 className="font-semibold mb-3 text-center my-5">Terapia</h3>
                                {folder.care && folder.care.length > 0 ? (
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-600">
                                                <th className="p-2">#</th>
                                                <th className="p-2">Nome</th>
                                                <th className="p-2">Descrizione</th>
                                                <th className="p-2">Giorni di durata</th>
                                                <th className="p-2">Frequenza</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {folder.care.map((care, idx) => (
                                                <tr key={care.id} className="border-b border-gray-700">
                                                    <td className="p-2">{idx + 1}</td>
                                                    <td className="p-2">{care.name}</td>
                                                    <td className="p-2">{care.description}</td>
                                                    <td className="p-2">{care.durationDays}</td>
                                                    <td className="p-2">{care.dailyFrequency}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-sm opacity-70 text-center">
                                        Nessuna Terapia registrata
                                    </p>
                                )}
                            </div>
                            <div className='outline rounded p-3'>
                                <h3 className='my-5'>Vaccini</h3>
                                {folder.vaccines && folder.vaccines.length > 0 ? (
                                    <table className='w-full text-sm border-collapse'>
                                        <thead>
                                            <tr className='border-b border-gray-600'>
                                                <th>#</th>
                                                <th>Nome</th>
                                                <th>Note</th>
                                                <th>Type</th>
                                                <th>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {folder.vaccines.map((vaccino, idxV) => (
                                                <tr key={vaccino.id} className='outline'>
                                                    <td className='p-2'>{idxV+1}</td>
                                                    <td className='p-2'>{vaccino.name}</td>
                                                    <td className='p-2'>{vaccino.note}</td>
                                                    <td className='p-2'>{vaccino.type}</td>
                                                    <td className='p-2'>{vaccino.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-sm opacity-70 text-center">
                                        Nessun vaccino registrato
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : selectedTab === "diagnoses" ? (
                <DiagnosesPage />
            ) : selectedTab === 'allergy' ? (
                <AllergyPage />
            ) : selectedTab === "care" ? (
                <CarePage />
            ) : (
                <VaccinePage />
            )}
        </div>
    )
}

function InfoField({
    label,
    value,
    full,
}: {
    label: string
    value: string
    full?: boolean
}) {
    return (
        <div className={`flex flex-col ${full ? 'md:col-span-2' : ''}`}>
            <span className="text-xs uppercase opacity-70">{label}</span>
            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2 break-all">
                {value}
            </div>
        </div>
    )
}