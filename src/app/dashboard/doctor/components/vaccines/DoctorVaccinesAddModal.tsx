import { createVaccinesByDoctor } from "@/lib/api/doctor";
import { Doctor, Patient, Vaccine, VaccinesFormData, VaccinesPayload } from "@/Types/Types";
import { ArrowLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import Select from "react-select";


type VaccinesProps = {
    selectedPatient?: Patient,
    setModal: (v: boolean) => void,
}

export default function DoctorVaccinesAddModal({ selectedPatient, setModal }: VaccinesProps) {
    const [selected, setSelected] = useState()
    const [data, setData] = useState<VaccinesFormData>()
    const [doctor, setDoctor] = useState<Doctor>()

     async function sendData(e: FormEvent<HTMLFormElement>) {
            e.preventDefault();
    
            if (!selectedPatient || !doctor) {
                console.error("Seleziona un paziente prima");
                return;
            }
    
                if(!data) return
            const payload:VaccinesPayload = {
                ...data,
                medicalRecordId:selectedPatient?.medicalRecord.id,
                doctorId:doctor.id,
                
            };
    
            try {
                const sent = await createVaccinesByDoctor(payload)
                console.log(payload, "durante invio");
            } catch (err) {
                console.error("errore nell'invio dati", err);
            }
        }
    return (
        <div className="absolute bg-black/30 h-full w-full top-0 left-0 flex justify-center items-center">
            <form onSubmit={sendData} className=" relative flex bg-white outline flex-col rounded-2xl p-5 gap-5">
                <p className="absolute top-1 hover:bg-red-400 hover:ring-red-800 cursor-pointer right-1 ring-2 flex items-center rounded-full h-5 w-5 justify-center" onClick={() => setModal(false)}><ArrowLeft /> </p>
                <span className="text-center">Allergie </span>
                <div className="flex flex-col">
                    <span className="font-light ">Allergene</span>
                    <input type="text" placeholder="Allergene" className="outline rounded-full p-1 focus:outline-blue-600" onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            name: e.target.value
                        }))
                    }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-light ">Reazioni</span>
                    <input type="text" placeholder="Reazioni" className="outline rounded-full p-1 focus:outline-blue-600" onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            type: e.target.value
                        }))
                    }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-light ">Data di inizio</span>
                    <input type="date" placeholder="Data" className="outline rounded-full p-1 focus:outline-blue-600" onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            vaccinationDate: new Date(e.target.value)
                        }))
                    }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-light ">Note</span>
                    <input type="text" placeholder="Note" className="outline rounded-full p-1 focus:outline-blue-600" onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            vaccinationBooster: new Date(e.target.value)
                        }))
                    }} />
                </div>

                <button className="rounded w-30 border" type="submit"> Aggiungi Allergia</button>
            </form>
        </div>
    )
}