import { get } from "http";
import DashPatient from "./patientDash";
import { cookies } from "next/headers";
import { createCookieSessionStorage } from "react-router-dom";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function DashboardPatientData() {
    const cookieStore = cookies();

    const res = await fetch(`${API_URL}l/auth/userID`, {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store"

    });
    const userData = await res.json();


    if (res.status === 401) {
        console.log("Non autenticato");
        return <p>Non sei autenticato</p>;
    }

    const data = await fetch(`${API_URL}/users/${userData.id}`, {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString()
        },
        cache: "no-store"


    });
    /*if (!data.ok) {
        console.log("errore,", data.status)
        return <p>Errore Raccolta dati utente</p>
    }*/
    const dataUser = await data.json()


    const dataAllergy = await fetch(`${API_URL}/allergies/userallergies/${userData.id}`, {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString()
        },
        cache: "no-store"
    })

    const patientAllergies = await dataAllergy.json()

    //console.log(dataUser, "testingsssss")
    //console.log(userData, "RES")
    console.log(patientAllergies, "allergie")
    return <DashPatient userData={dataUser} patientAllergies={patientAllergies} />;
}
