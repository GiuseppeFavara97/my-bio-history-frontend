'use client'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSharedData } from '../_shared/SharedData';
import { MedicalRecord, User } from '@/Types/Types';
import AllergyPage from '../allergy/allergy';
import VaccinePage from '../vaccines/page';


export default function PatientClient({
    medicalrecord,
    userData,
}: {
    medicalrecord: MedicalRecord[]
    userData: User | null
}) {
    const [user, setUser] = useState<User | null>(userData)
    const [medical, setMedical] = useState<any>([medicalrecord])
    const {selectedTab,setSelectedTab,patientName,setPatientName} = useSharedData();
    console.log(medical)
    if (user) {
        setPatientName(user.firstName)
    }

    useEffect(() => {
        setUser(userData)
    }, [])
    if (!user) return null;
    return (
        <div className='h-full text-white'>
            
            {selectedTab === "dati" ? (
                <div className="flex-1 p-4 outline rounded-t">
                    <h2 className="text-lg font-semibold mb-3">I miei dati</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Nome</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2">
                                {user.firstName}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Cognome</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2">
                                {user.lastName}
                            </div>
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <span className="text-xs uppercase opacity-70">Email</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2 break-all">
                                {user.email}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Username</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2">
                                {user.username}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Ruolo</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2">
                                {user.role}
                            </div>
                        </div>
                    </div>
                </div>
                
        ) : selectedTab === "medical" ? (
            medical.map((folder:MedicalRecord, i:number) => (
                <div key={i} className=" h-full p-4 rounded-t">
                    <h2 className="text-lg font-semibold mb-3">Cartella Clinica Work in Progress</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Nome Paziente</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2">
                                {folder.patient.fullName}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Cognome</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2">
                                {user.lastName}
                            </div>
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <span className="text-xs uppercase opacity-70">Indirizzo</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2 break-all">
                                {folder.patient.address}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Username</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2">
                                {user.username}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Ruolo</span>
                            <div className="mt-1 outline outline-lime-400/60 rounded-md px-3 py-2">
                                {user.role}
                            </div>
                        </div>
                    </div>
                    <div className='text-center h-full my-10  grid grid-rows-3 gap-1 '> 
                    
                        <div className="outline rounded-md p-3">
                            <h3 className="font-semibold mb-3 text-center my-5">Allergie</h3>

                        {folder.allergies.length > 0 ? (
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-600">
                                        <th className=" p-2">#</th>
                                        <th className=" p-2">Allergene</th>
                                        <th className=" p-2">Note</th>
                                        <th className=" p-2">Reazione</th>
                                        <th className=" p-2">Gravità</th>
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
                    <div className='outline rounded p-3'> 
                    <h3 className='my-5'>Vaccini</h3>
                    {folder.vaccines.length > 0 ? (
                        <table className='w-full text-sm border-collapse'>
                            <thead>
                                <tr className='border-b border-gray-600'>
                                    <th className=''>#</th>
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
                        
                    ) : ("")}
                    </div>
                    </div>
                </div>
            ))
            
        ) : selectedTab ==='allergy' ? ( <AllergyPage />
        ) : (<VaccinePage/>)}

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