'use client'

import { useEffect, useState } from "react"

type User ={
    username:string;
    email:string;
    firstName:string;
    lastName:string;
    role:string;
}
export default function Pageadmin() {
        const [user, setUser] = useState<User | null >(null)



    useEffect(() =>  {
    
    const userloc =localStorage.getItem('user')
    if (userloc) try{
    const parsed = JSON.parse(userloc)
    setUser(parsed);
    } catch (error) {
        console.error('errore nel parsing ', error);
        localStorage.removeItem('user');
    }
    
    }, []);
    console.log(user)

    return (
        
        <div className="flex flex-col">
    {user ? (
    <p className=""> ciao {user.role} {user.firstName} {user.lastName}</p>
    
    ) : (
        <p> nada </p>
    )}
    </div>
    )

}