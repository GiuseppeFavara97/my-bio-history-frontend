"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentPatient } from "@/lib/api/patient";
import { Patient } from "@/Types/Types";
import DashPatient from "./patientDash";

export default function PatientPage() {
    const router = useRouter();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentPatient()
            .then(setPatient)
            .catch(() => router.push("/auth"))
            .finally(() => setLoading(false));
    }, [router]);

    if (loading) {
        return <p className="p-6">Caricamento...</p>;
    }

    if (!patient) {
        return null;
    }

    return (
        <DashPatient
            userData={patient}
            patientAllergies={patient.allergies}
        />
    );
}