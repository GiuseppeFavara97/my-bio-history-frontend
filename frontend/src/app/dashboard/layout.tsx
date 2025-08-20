import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies()
  const token = cookie.get('auth_token')?.value

  if (!token) redirect('/login')
  return (
    <div className="flex bg-gradient-to-t from-gray-700 to-gray-900">
      <main className="p-0.5 w-1/10 rounded-r-2xl">{children}</main>
    </div>
  )
}