import axios from "axios";
import { Bell, CircleUser, Notebook, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import DoctorHomeCards from "./DoctorHomeCards";
import { motion } from "framer-motion";
import DoctorVaccinesPatient from "./vaccines/DoctorVaccinesList";
import DoctorAllergiesPatient from "./allergies/DoctorAllergiesList";
import { Allergy, Patient, Vaccine } from "@/Types/Types";
import { api } from "@/lib/api/api";
import { getPatients } from "@/lib/api/patient";
import { dataFocusVisibleClasses } from "@heroui/react";


export default function DoctorHome() {

    const [patients, setPatients] = useState<Patient[]>([])
    const [selectedPatient, setSelectedPatient] = useState<Patient>()
    const [allergies, setAllergies] = useState<Allergy[]>([])
    const [vaccines, setVaccines] = useState<Vaccine[]>([])
    const [selectedButton, setSelectedButton] = useState<string>("riepilogo")
    const [toggle, setToggle] = useState<boolean>(false)




    useEffect(() => {
        async function fetchPatients() {
            const data = await getPatients()
            setPatients(data)
        }
        fetchPatients()
    }, [])

        console.log(patients, "pazienti presi")

    useEffect(() => {
        async function fetchAllergyByUserId(id: number) {
            const data = await axios.get(`http://localhost:8080/api/allergies/patient/${id}`, { withCredentials: true })
            setAllergies(data.data)
        }
        async function fetchVaccineByUserId(id: number) {
            const data = await axios.get(`http://localhost:8080/api/vaccines`, { withCredentials: true })
            setVaccines(data.data)
        }
        if (!selectedPatient) return;
        fetchAllergyByUserId(selectedPatient?.id)
        fetchVaccineByUserId(selectedPatient.id)
    }, [selectedPatient])

    

    return (
        <main className="flex flex-col h-full w-full overflow-hidden">


            <header className="flex w-full h-15 justify-between items-center bg-blue-800 text-white">
                <p className="mx-10 text-3xl font-medium">
                    Bentornato Dottor White
                </p>

                <div className="flex items-center gap-5 mr-10">
                    <Bell
                        size={20}
                        className="duration-500 ease-in-out hover:scale-120 cursor-pointer"
                    />
                    <CircleUser
                        size={35}
                        className="duration-500 ease-in-out hover:scale-120 cursor-pointer"
                    />
                </div>
            </header>


            <div id="right" className="flex flex-1 w-full ">
                <aside className="flex h-full w-3/12 justify-center items-center ">
                    <div className="rounded-2xl flex flex-col h-11/12 w-10/12 bg-gray-400/30">

                        <div
                            id="filtersection"
                            className="flex items-center w-full p-2 gap-2">
                            <input
                                type="search"
                                className="ring font-extralight text-sm rounded-2xl w-full px-3 py-1"
                                placeholder="Cerca paziente per nome o CF"
                            />
                            <SlidersHorizontal className="cursor-pointer shrink-0" />
                        </div>
                        <div
                            id="Patientlist"
                            className="flex-1 overflow-auto p-1">
                            {patients && (
                                patients.map((patient: Patient, i) => (
                                    <div key={patient.id} onClick={() => setSelectedPatient(patients[i])} className=" outline rounded-md  ">
                                        <div className="flex">
                                            <img src="/barney.webp" className="w-20 h-20 p-3 rounded-full " />
                                            <div className="flex flex-col">
                                                <span>{patient.firstName} {patient.lastName}</span>
                                                <span className="font-light text-sm">Età: {patient.age}</span>
                                                <span className="text-sm font-light">CF: {patient.taxCode}</span>
                                            </div>
                                            <span></span>
                                        </div>
                                    </div>)))}
                        </div>
                    </div>
                </aside>


                <div className="flex flex-col flex-1 outline " id="rightpart">
                    <div className="flex flex-col outline-2 outline-black rounded-2xl p-3 m-10 self-center w-10/12">
                        <span className="font-bold text-2xl">Cartella clinica paziente</span>
                        <div className="flex flex-col ml-2">
                            <p className="flex font-medium ">{selectedPatient?.firstName} {selectedPatient?.lastName}</p>
                            <div className="flex gap-3 ">
                                <p className="flex text-sm font-light ">Data di nascità: {selectedPatient?.birthday
                                    ? new Date(selectedPatient.birthday).toLocaleDateString()
                                    : "-"}</p>
                                <p className="flex text-sm font-light">Età: {selectedPatient?.age}</p>
                                <p className="flex text-sm font-light">CF: {selectedPatient?.taxCode}</p>
                            </div>
                            <span className="my-2 ring-1 bg-amber-900 text-white rounded-2xl p-1 w-30  ">Allergie: Noci</span>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="flex gap-5 w-10/12  justify-between ">
                            <DoctorHomeCards onClick={() => setSelectedButton("Riepilogo")} active={selectedButton} label="Riepilogo" />
                            <DoctorHomeCards onClick={() => setSelectedButton("Allergie")} active={selectedButton} label="Allergie" />
                            <DoctorHomeCards onClick={() => setSelectedButton("Diagnosi")} active={selectedButton} label="Diagnosi" />
                            <DoctorHomeCards onClick={() => setSelectedButton("Terapie")} active={selectedButton} label="Terapie" />
                            <DoctorHomeCards onClick={() => setSelectedButton("Visite")} active={selectedButton} label="Visite" />
                            <DoctorHomeCards onClick={() => setSelectedButton("Esami")} active={selectedButton} label="Esami" />
                        </div>
                    </div>
                    <div className=" m-8 flex flex-1 ">

                        <div className="mx-10
                            flex-3 flex flex-col outline bg-gray-400/20 rounded-2xl p-2" >
                            {selectedButton == "Riepilogo" ? (
                                <span className="text-2xl">Riepilogo</span>
                            ) : selectedButton == "Allergie" ? (
                                <div>
                                    <span>Allergie</span>
                                <DoctorAllergiesPatient selectedPatient={selectedPatient} allergies={allergies}/>
                                </div>
                            ) : selectedButton == "Esami" ? (
                                <div>
                                    <span>Vaccini</span>
                                    <DoctorVaccinesPatient selectedPatient={selectedPatient}  vaccines={vaccines} />
                                </div>) : ("")}
                        </div>


                        <div className="flex-1 outline rounded-2xl bg-gray-400/20 p-2">
                            <p className="text-center text-xl font-bold">Appuntamenti</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
