'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import type { PersonData, User } from "@/Types/Types";

interface PatientProfileProps {
  userData: PersonData;
  userDataAccount: User;
  setMainArea: (value: any) => void;
}

export default function PatientProfile({ userData, userDataAccount, setMainArea }: PatientProfileProps) {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          {userData.firstName} {userData.lastName}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="mt-4 space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-3">Account</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Info label="Username" value={userDataAccount?.username} />
            <Info label="Email" value={userDataAccount?.email} />
          </div>
        </section>
        <Separator />
        <section>
          <h3 className="text-lg font-semibold mb-3">Dati anagrafici</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Info label="Codice Fiscale" value={userData.taxCode} />
            <Info label="Data di nascita" value={
              new Date(userData.birthday).toLocaleDateString()
            } />
            <Info label="Età" value={`${userData.age} anni`} />
            <Info label="Telefono" value={userData.phoneNumber} />
            <Info label="Comune" value={userData.municipality} />
            <Info label="Provincia" value={userData.province} />
            <Info label="Stato" value={userData.state} />
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col bg-gray-50 rounded-xl p-3">
      <span className="text-gray-500 text-xs uppercase tracking-wide">
        {label}
      </span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  )
}