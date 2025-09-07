'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import PatientClient from "./patientClient";
import { MedicalRecord, User } from "@/Types/Types";



export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [medical, setMedical] = useState<MedicalRecord[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        async function fetchData() {
            try {

                // Recupero utente loggato
                const res = await axios.get(`${API_URL}/api/auth/userID`, {
                    withCredentials: true,
                });

                const loggedUser: User = res.data;
                setUser(loggedUser);

                // Recupero medical record
                const medicalRes = await axios.get(
                    `${API_URL}/api/medical/patient/${loggedUser.id}`,
                    { withCredentials: true }
                );
                setMedical(medicalRes.data);

                //dettagli utente più completi
                const userRes = await axios.get(`${API_URL}/api/users/${loggedUser.id}`, { withCredentials: true });
                setUser(userRes.data);

            } catch (err: any) {
                console.error("Errore:", err);
                setError(
                    err.response?.status === 401
                        ? "401 - Non Autorizzato"
                        : "Errore durante il caricamento"
                );
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [API_URL]);

    if (loading) return <p>Caricamento…</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!user) return <p>Nessun utente trovato</p>;

    return <PatientClient medicalrecord={medical} userData={user} />;
}