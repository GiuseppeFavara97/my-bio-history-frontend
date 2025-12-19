import { Doctor, Patient, AllergyPayload, AllergyFormData, Severity, } from "@/Types/Types"
import Select from "react-select";
import { FormEvent, useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react";
import { createAllergyByDoctor, getCurrentDoctor } from "@/lib/api/doctor";

type AllergiespatientAddprops = {
    selectedPatient?: Patient;
    setModal: (v: boolean) => void
}

export default function DoctorAllergiesAddModal({ selectedPatient, setModal }: AllergiespatientAddprops) {
    const options = [
        { value: Severity.LIEVE, label: "Lieve" },
        { value: Severity.MODERATA, label: "Media" },
        { value: Severity.GRAVE, label: "Grave" },
    ] as const;

    const [selected, setSelected] = useState()
    const [data, setData] = useState<AllergyFormData>({
        allergen: "",
        reaction: "",
        note: "",
        startDate: new Date,
        severity: Severity.LIEVE,
    })
    const [doctor, setDoctor] = useState<Doctor>()

    useEffect(() => {
        async function fetchLoggedUserData() {
            const response = await getCurrentDoctor();
            setDoctor(response);
        }

        fetchLoggedUserData();
    }, []);

    async function sendData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!selectedPatient || !doctor) {
            console.error("Seleziona un paziente prima");
            return;
        }

        if (!data) return
        const payload: AllergyPayload = {
            ...data,
            medicalRecordId: selectedPatient?.medicalRecord.id,
            doctorId: doctor.id,

        };

        try {
            const sent = await createAllergyByDoctor(payload)
            console.log(payload, "durante invio");
        } catch (err) {
            console.error("errore nell'invio dati", err);
        }
    }


    console.log(doctor, "dottore")
    console.log(data, "da mandare")
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
                            allergen: e.target.value
                        }))
                    }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-light ">Reazioni</span>
                    <input type="text" placeholder="Reazioni" className="outline rounded-full p-1 focus:outline-blue-600" onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            reaction: e.target.value
                        }))
                    }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-light ">Data di inizio</span>
                    <input type="date" placeholder="Data" className="outline rounded-full p-1 focus:outline-blue-600" onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            startDate: new Date(e.target.value)
                        }))
                    }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-light ">Note</span>
                    <input type="text" placeholder="Note" className="outline rounded-full p-1 focus:outline-blue-600" onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            note: e.target.value
                        }))
                    }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-light ">Gravità</span>
                    <Select options={options} value={selected} onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            severity: e?.value as Severity
                        }))
                    }}
                        placeholder="Seleziona una gravità" isClearable className="  p-1 focus:outline-blue-600" />
                </div>
                <button className="rounded w-30 border" type="submit"> Aggiungi Allergia</button>
            </form>
        </div>
    )

}