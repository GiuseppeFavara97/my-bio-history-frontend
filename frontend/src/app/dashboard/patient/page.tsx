'use client'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

type User ={
    username:string;
    email:string;
    firstName:string;
    lastName:string;
    role:string;
}


export default function Page(){
    const [dati, setDati] = useState<string>("dati")
    const [user, setUser] = useState<User | null>(null)
    const [open, setOpen] = useState(true) 
    useEffect(() => {
        try {
        const localuser= localStorage.getItem('user')
        if (localuser) {
        const user=JSON.parse(localuser)
        setUser(user)
        }
            } catch (error) {
        console.error('errore nel parsing ', error);
        localStorage.removeItem('user');
        setUser(null)
                }
    },[])
        if  (!user) return null;
    return (
        <div  className='flex w-screen '>
            <div className='p-2 outline outline-indigo-600 rounded-r-2xl'>
                <div className="text-center cursor-pointer" onClick={() =>setOpen(old => !old)}>
                    {open? "Nascondi" : "Menu"}
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ?  "max-h-[100vh] w-full opacity-100" : "  w-0 max-h-0 opacity-0 pointer-events-none"}`}>
                    <div  className='flex flex-col space-y-1 p-1 h-screen rounded-r-xl bg-gradient-to-br from-gray-800  to-gray-900 '>
                        <p className='text-center font-bold font-serif'>Benvenuto</p>
                        <p className='text-center'>{user?.firstName} </p>
                        <p className='text-center py-5'> Strumenti </p>
                        <button onClick={() => setDati("dati")} className='p-1 outline outline-indigo-600 rounded-r-full text-center cursor-pointer'>I miei dati</button>
                        <button onClick={() => setDati("medical")} className='p-1 outline outline-indigo-600 rounded-r-full text-center cursor-pointer'>Cartella Clinica</button>
                    </div>
                </div>   
            </div>
            {dati === "dati" ? (
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
    ) : dati === "medical" ? (
        <div className="flex-1 p-4 outline outline-lime-400">Medical dati</div>
        )    : (
                "seleziona uno strumento"
            )}

</div>
            

    )
}