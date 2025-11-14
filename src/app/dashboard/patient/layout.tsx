import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardProvider } from '../_shared/SharedData'
import Sidebar from './components/sidebar'


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies()
  const token = cookie.get('auth_token')?.value
  if (!token) redirect('/login')
  return (
    
    
      <div className='flex flex-1 bg-gradient-to-b from-gray-900 via-slate-950 to-gray-950 w-full '>
        <div className="flex flex-1  ">
          <Sidebar />
          <main className="p-0.5 flex-1"> {children} </main>
        </div>
      </div>
      
    
  )
}