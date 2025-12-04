'use client'


import { ArrowLeft, ChevronDown, ChevronFirst, ChevronLeft, ChevronRight, CircleUser, CircleUserRound, ClipboardClock, ClipboardPlus, Folder, FolderArchive, ListFilter, PillBottle, Stethoscope } from "lucide-react"
import { useState } from "react"
import PatientProfile from "./components/patientProfile"
import PatientAllergy from "./components/patientAllergy"
import PatientVisits from "./components/patientVisits"
import PatientMiniProfile from "./components/patientMiniProfile"
import { User, allergies } from "../../../../Types/Types"

export default function DashPatient({ userData, patientAllergies }: { userData: User, patientAllergies: allergies[] }) {

    const [user, setUser] = useState<User>(userData)
    const [toggle, setToggle] = useState<Boolean>(false)
    const [allergies, setAllergies] = useState<allergies[]>(patientAllergies)
    const [togglePatientData, setPatientData] = useState<string>("menu")
    const [toggleMainArea, setMainArea] = useState<string>("profilo")

    return (
        <main className="flex flex-col sm:flex-row h-full m-10 bg-[#f4f5f7]  ">
            <aside id="lefT" className="m-1 gap-y-6 flex flex-col h-full">
                <div id="Profile" className="bg-[#ffffff] flex w-100 h-50 border border-gray-600  rounded-2xl p-5 justify-center items-center">
                    <img className="rounded h-full " alt="Foto Profilo" src="/barney.webp" width={100} height={50} />
                    {togglePatientData == "menu" ? (
                        <div className="flex flex-col h-full w-full ml-2    ">
                            <span className="text-center mb-2 text-xl"> Profilo paziente</span>

                            <div onClick={() => setPatientData("profile")} className="cursor-pointer flex justify-between group hover:bg-gray-200 hover:rounded-2xl">
                                <h3 className="group-hover:scale-120 group-hover:translate-x-5 group-hover:font-bold duration-500 ">Dati personali</h3>
                                <ChevronRight className="duration-300 group-hover:-translate-x-5 group-hover:scale-120 group-hover:text-blue-500" />
                            </div>
                            <div onClick={() => setMainArea("allergy")} className="flex justify-between cursor-pointer group hover:bg-gray-200 hover:rounded-2xl ">
                                <h3 className="group-hover:scale-120  group-hover:translate-x-5 group-hover:font-bold duration-500 ">Allergie</h3>
                                <ChevronRight className="duration-300 group-hover:-translate-x-5 group-hover:scale-120 group-hover:text-blue-500" />
                            </div>
                            <div className="flex justify-between cursor-pointer group hover:bg-gray-200 hover:rounded-2xl">
                                <h3 className="group-hover:scale-120 group-hover:translate-x-5 group-hover:font-bold duration-500 ">Condizioni attuali</h3>
                                <ChevronRight className="duration-300 group-hover:-translate-x-5 group-hover:scale-120 group-hover:text-blue-500" />
                            </div>
                            <div className="flex justify-between cursor-pointer group hover:bg-gray-200 hover:rounded-2xl" >
                                <h3 className="group-hover:scale-120 group-hover:translate-x-5 group-hover:font-bold duration-500 ">Terapie</h3>
                                <ChevronRight className="duration-300 group-hover:-translate-x-5 group-hover:scale-120 group-hover:text-blue-500" />
                            </div>

                        </div>
                    ) : togglePatientData == "profile" &&
                    (<PatientMiniProfile userData={userData} setPatientData={setPatientData} />)
                    }
                </div>
                <div className="bg-[#ffffff] p-2 gap-y-3  w-10/12 h-80  rounded-2xl  flex flex-col ">
                    <span className="self-center font-bold">Cartella Clinica</span>
                    <div className="flex justify-between">
                        <div className="flex gap-x-3 ">
                            <CircleUser />
                            <h3>Visite</h3>
                        </div>
                        <ChevronRight />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-x-3">
                            <ClipboardPlus />
                            <h3>Esami</h3>
                        </div>
                        <ChevronRight />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-x-3">
                            <PillBottle />
                            <h3>Prescrizioni</h3>
                        </div>
                        <ChevronRight />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-x-3">
                            <Stethoscope />
                            <h3>Risultati</h3>
                        </div>
                        <ChevronRight />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-x-3">
                            <ClipboardClock />
                            <h3>Appuntamenti</h3>
                        </div>
                        <ChevronRight />
                    </div>
                </div>
            </aside>
            <div id="right" className=" w-full">
                <div className="p-5 bg-[#ffffff] m-6 h-9/12 outline  rounded-2xl">
                    {toggleMainArea == "allergy" ? (<PatientAllergy allergies={patientAllergies} setMainArea={setMainArea} />)
                        : toggleMainArea == "visite" ? (<PatientVisits />)
                            : toggleMainArea == "profilo" ? (<PatientProfile userData={userData} setMainArea={setMainArea} />) : ("")

                    }
                    <div>

                    </div>
                </div>
            </div>
        </main>
    )
}





/*



<div className="outline relative flex duration-300 transition-all rounded-2xl justify-center items-center h-20 w-50 shadow-2xl shadow-black ">
                        <span> Ordina per</span>
                        <ChevronDown className="" onClick={() => setToggle(toggle => !toggle)} />

                        <div
                            className={`
                                            absolute top-1/2 left-full -translate-x-1/2 mt-2 
                                            bg-white rounded-xl shadow-black p-4 shadow-xl
                                            transition-all duration-300 h-30 w-30
                                            ${toggle ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-2 pointer-events-none"}
                                        `}
                        >
                            <h1 className="hover:scale-120 hover:font-bold">opzione1</h1>
                            <h1 className="hover:scale-120 hover:font-bold">opzione2</h1>
                            <h1 className="hover:scale-120 hover:font-bold">opzione3</h1>
                        </div>
                    </div>





                    */