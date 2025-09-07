'use client'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSharedData } from '../_shared/SharedData';
import { MedicalRecord, User } from '@/Types/Types';


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
        <div className='flex w-screen text-white'>
            
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
                <div key={i} className="flex-1 p-4 outline rounded-t">
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
                </div>
            ))
        ) : (
            "seleziona uno strumento"
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