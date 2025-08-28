'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import PatientClient from "./patientClient";

interface User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
};

interface MedicalRecord = {
    id: number;
    description: string;
    date: string; // oppure Date se lo converti
};

export default function Page() {

    const [data, setData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [medical, setMedical] = useState<MedicalRecord[]>([]);
    const [user, setUser] = useState<User | null>(null);
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
                const res = await axios.get('http://localhost:3001/api/auth/userID', { withCredentials: true });
                setData(res.data);
                fetchMedicalRecord(res.data.id);
                LoggedUserData(res.data.id);
            } catch (err) {
                console.error("errore:", err);
                setError("401 - Non Autorizzato");
            }
        }
        async function fetchMedicalRecord(id: number) {
            try {
                const risposta = await axios.get(`http://localhost:3001/api/medical/patient/${id}`, { withCredentials: true });
                setMedical(risposta.data)
            } catch (err) {
                console.error("errore:", err);
                setError("401 - Non Autorizzato");
            }
        }
        async function LoggedUserData(id: number) {
            try {
                const risuser = await axios.get(`http://localhost:3001/api/users/${id}`, { withCredentials: true });
                setUser(risuser.data)
            } catch (err) {
                console.error("errore:", err);
                setError("401 - Non Autorizzato");
            }
        }

        LoggedUserID();
    }, []);
    console.log(data)
    console.log(medical)
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!data) return <p>Caricamento…</p>;

    return <PatientClient medicalrecord={medical} userData={user} />
}