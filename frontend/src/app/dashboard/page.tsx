

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardHome() {
  const cookie = await cookies()
  const token = cookie.get('auth_token')?.value
  const role = cookie.get('ruolo')?.value

  if (!token) {
    return (
      <div className="w-screen  flex  flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-4">Accesso non autorizzato</h1>
        <p>Effettua prima il  {' '}
        <a href="/login" className="text-blue-600 underline">Login</a> per accedere alla dashboard.</p>
        
      </div>
    )
  }
  if (role && role.toLowerCase() === 'doctor'){
    redirect("/dashboard/doctor")
  } else if (role && role.toLowerCase() === 'admin'){
    redirect("/dashboard/admin")
  } else {
    redirect ("/dashboard/patient")
  }
}