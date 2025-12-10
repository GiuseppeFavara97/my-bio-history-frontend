
import { ArrowLeft, ChevronLeft, MoveLeftIcon, Notebook } from "lucide-react";
import { motion } from "motion/react"
import { useState } from "react";
import { allergies } from "../../../../../Types/Types";

export default function PatientAllergy({ allergies, setMainArea }: { allergies: allergies[], setMainArea: (value: string) => void }) {

    const [toggle, setToggle] = useState<boolean>(false)

    if (!Array.isArray(allergies) || allergies.length === 0) {
        return (
            <div className=" flex flex-col h-full w-full p-4 gap-y-5 font-bold">
                <div className="cursor-pointer" onClick={() => setMainArea("home")}> <ArrowLeft className="hover:scale-120" /></div>

                Non ci sono Allergie

            </div>
        )

    }

    return (
        <div className=" flex flex-col h-full w-full p-4 gap-y-5">

            <h1 className=" relative font-bold text-2xl">
                ALLERGIE
                <div className="cursor-pointer absolute -left-8 top-1" onClick={() => setMainArea("home")}> <ArrowLeft className="hover:scale-120" /></div>
            </h1>
            <div className="flex flex-col rounded-2xl gap-y-2  border-t-5 border-l-2 border-r-2 border-b-4 shadow-2xl h-full overflow-auto">
                {allergies.map((allergy: allergies, i: number) => (

                    <div className=" flex  items-center border-b  rounded-2xl p-3  gap-5" key={allergy.id}>
                        <div className="flex flex-col w-50 overflow-auto">
                            <span className="font-bold text-2xl ">{allergy.allergen} </span>
                            <p>{allergy.reaction} </p>
                        </div>

                        {toggle === true && (<motion.div className="w-full h-full" initial={{ opacity: 0 }} animate={{
                            transition: { duration: 0.5 },

                            opacity: 1
                        }}>
                            <textarea placeholder={allergy.note} defaultValue={allergy.note} className="flex resize h-full w-8/10 outline " />
                        </motion.div>)}

                        <Notebook className="ml-auto cursor-pointer hover:scale-120" onClick={() => setToggle(toggle => !toggle)} />

                    </div>

                ))}
            </div>

        </div>


    )






    /* <table className="">
                    <thead>
                        <tr>
                            <th className="border  ">ID</th>
                            <th className="border">Nome</th>
                            <th className="border">Gravità</th>
                            <th className="border">Note</th>
                        </tr>
                    </thead>
    
                    <tbody>
    
                        {allergies.map((allergy, i) => (
                            <tr className="text-center" key={allergy.id} >
                                <td className="border"> {allergy.allergen}</td>
                                <td className="border">{allergy.reaction}</td>
                                <td className="border">{allergy.severity}</td>
                                <td className="border">{allergy.note}</td>
                            </tr>
                        ))}
    
                    </tbody>
                </table>
    */


}