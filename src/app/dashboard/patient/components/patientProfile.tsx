import { User } from "@/Types/Types";
import { useState } from "react";


export default function PatientProfile({ userData, setMainArea }: { userData: User, setMainArea: (value: string) => void }) {

    const [editMode, setEditMode] = useState<boolean>(false)
    return (
        <div className="flex h-full w-full">

            <aside className="flex p-10 h-full ">
                <img className="rounded-full h-50 w-50 " alt="Foto Profilo" src="/barney.webp" width={100} height={50} />
            </aside>
            <div className="flex flex-col flex-1   h-full  " id="right">
                <header className="flex flex-col p-10 border-b">
                    <h1 className="font-bold text-3xl">{userData.firstName} {userData.lastName}      </h1>
                    <span> "Nome città", {userData.province} </span>

                </header>
                <div className="flex  ml-10 items-center gap-y-1 h-full w-full gap-x-5">
                    <div className="flex flex-col gap-y-2">
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Username:</span>
                            <p className="font-bold">{userData.username}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Nome:</span>
                            <p className="font-bold">{userData.firstName}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Cognome:</span>
                            <p className="font-bold">{userData.lastName}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Email:</span>
                            <p className="font-bold">{userData.email}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Data di nascita:</span>
                            <p className="font-bold">{new Date (userData.birthday)?.toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Luogo di nascita:</span>
                            <p className="font-bold">{userData.birthdayPlace}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Provincia:</span>
                            <p className="font-bold">{userData.province}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Codice fiscale:</span>
                            <p className="font-bold">{userData.taxCode}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Sesso:</span>
                            <p className="font-bold">{userData.sex}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <span className=" font-thin "> Numero di telefono:</span>
                            <p className="font-bold">{userData.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}