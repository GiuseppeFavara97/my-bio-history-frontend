import { cookies } from 'next/headers'


export default async function Page(){
    const cookie = await cookies() 
const role = cookie.get('ruolo')?.value
    return <p>Prova Patient sei qui perchè il tuo ruolo è {role}</p>
}