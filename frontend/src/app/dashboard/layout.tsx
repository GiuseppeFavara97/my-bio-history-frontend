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
      <div className="flex bg-gradient-to-t from-gray-700 to-gray-900">
        <Sidebar />
        <main className="p-0.5 w-1/10 rounded-r-2xl"> {children} </main>
      </div>
      </DashboardProvider>
    
  )
}