'use client'
import axios from "axios";
import { log } from "console";
import { useEffect, useState } from "react";
import PatientClient from "./patientClient";


export default  function Page() {

    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [medical, setMedical] = useState<any> ([]);
    const [user, setUser] = useState<any> ([])

    useEffect(() => {
        async function LoggedUserID() {
            try {
                const res = await axios.get('http://localhost:3001/api/auth/userID', { withCredentials: true });
                setData(res.data);
                fetchMedicalRecord(res.data.id);
                LoggedUserData(res.data.id);
            } catch (err) {
                console.error("errore:", err);
                setError("401 - Non Autorizzato");
            }
        }
        async function fetchMedicalRecord(id:number) {
            try {
                const risposta = await axios.get(`http://localhost:3001/api/medical/patient/${id}` , {withCredentials:true});
                setMedical(risposta.data)
            } catch (err) {
                console.error("errore:", err);
                setError("401 - Non Autorizzato");
            }
        }
        async function LoggedUserData(id:number) {
             try {
                const risuser = await axios.get(`http://localhost:3001/api/users/${id}` , {withCredentials:true});
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