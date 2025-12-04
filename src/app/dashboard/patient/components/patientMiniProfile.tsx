import ToggleSwitch from "@/components/toggle";
import { User } from "@/Types/Types";
import { ArrowLeft } from "lucide-react";

export default function PatientMiniProfile({ userData, setPatientData }: { userData: User, setPatientData: (value: string) => void; }) {



    return (
        <div className="relative flex flex-col w-full ml-2    ">
            <div className="flex justify-around">
                <div className="flex flex-col">
                    <p className="font-bold text-sm">Nome</p>
                    <p className="text-center">{userData.firstName}</p>
                </div>
                <div className="flex flex-col">
                <p className="font-bold text-sm">Cognome</p>
                <p className="text-center">{userData.lastName}</p>
                </div>

            </div>

            <div>
            <p className="text-sm font-bold text-center">Username</p>
            <p className="text-center">{userData.username}</p>
            </div>

            <div>
            <p className="font-bold text-sm text-center">Email</p>
            <p className="flex justify-center">{userData.email}</p>
            </div>
            <div className="flex flex-col">
            <p className="text-sm font-bold text-center">Data di nascita :</p>
            <p className="text-center">{new Date(userData.birthday)?.toLocaleDateString()}</p>
            </div>
            <div onClick={() => setPatientData("menu")} className=" absolute bottom-0 right-0 cursor-pointer"> <ArrowLeft className="hover:scale-120" /></div>
        </div>
    )
}