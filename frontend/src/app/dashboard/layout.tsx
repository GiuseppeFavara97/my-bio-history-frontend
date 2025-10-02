import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardProvider } from './_shared/SharedData'
import Sidebar from './patient/components/sidebar'

type Ciao = {
  username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies()
  const token = cookie.get('auth_token')?.value
  let ciao: Ciao = { firstName: "lol", username:"username", email:"email", lastName:"lastName", role:"ruolo" }
  if (!token) redirect('/login')
  return (
    
     <DashboardProvider>
      <div className="flex bg-gradient-to-t from-gray-700 to-gray-900 min-h-screen"> {/* Aggiunto min-h-screen per altezza minima */}
        <Sidebar />
        {/* MODIFICA QUI */}
        {/* Opzione 1: Il contenuto principale prende lo spazio rimanente */}
        <main className="flex-grow p-4 rounded-r-2xl overflow-auto"> {/* Aggiunto p-4 per un po' di padding generale, e overflow-auto */}
          {children}
        </main>

        {/* Opzione 2: Se vuoi una larghezza percentuale specifica per il main, ma più grande */}
        {/* <main className="w-9/10 p-4 rounded-r-2xl overflow-auto"> */}
          {/* {children} */}
        {/* </main> */}

      </div>
      </DashboardProvider>
    
  )
}