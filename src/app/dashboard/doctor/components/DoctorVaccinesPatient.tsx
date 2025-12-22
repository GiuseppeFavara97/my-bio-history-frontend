import { useState } from "react";
import { Vaccine } from "@/Types/Types";
import { motion } from "framer-motion";
import { Notebook } from "lucide-react";

export default function DoctorVaccinesPatient({ vaccines }: { vaccines: Vaccine[] }) {
    const [toggle, setToggle] = useState<boolean>(false)


    return (
        <div>
            {vaccines.map((vaccine: Vaccine, i: number) => (

                <div className=" flex  items-center border-b  rounded-2xl p-3  gap-5" key={vaccine.id}>
                    <div className="flex flex-col w-50 overflow-auto">
                        <span className="font-bold text-2xl ">{vaccine.name} </span>
                        <p>{vaccine.name} </p>
                    </div>

                    {toggle === true && (<motion.div className="w-full h-full" initial={{ opacity: 0 }} animate={{
                        transition: { duration: 0.5 },

                        opacity: 1
                    }}>
                        <textarea placeholder={vaccine.name} defaultValue={vaccine.name} className="flex resize h-full w-8/10 outline " />
                    </motion.div>)}

                    <Notebook className="ml-auto cursor-pointer hover:scale-120" onClick={() => setToggle(toggle => !toggle)} />

                </div>

            ))}
        </div>
    )

}