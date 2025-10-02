import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Sidebar from './components/sidebar'


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies()
  const token = cookie.get('auth_token')?.value
  if (!token) redirect('/login')
  return (
    
      
<div className="flex-1 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:bg-gradient-to-b dark:from-gray-900 dark:via-slate-950 dark:to-gray-950 w-full">
        <div className="flex w-full  ">
          <Sidebar />
          <main className="p-0.5 w-full flex-grow "> {children} </main>
        </div>
      </div>
      
    
  )
}