import { Patient } from "@/Types/Types";
import { api } from "./api";

export const getPatients = () => api.get("/patients").then(res => res.data);
export const getPatientById = (id: string) => api.get(`/patients/getById/${id}`).then(res => res.data);
export const createPatient = (data: any) => api.post("/patients/create", data).then(res => res.data);
export const updatePatient = (id: number, data: Partial<Patient>) => api.patch(`/patients/update/${id}`, data).then(res => res.data);
export const softDeletePatient = (id: number) => api.patch(`/patients/softDelete/${id}`).then(res => res.data);
export const getCurrentPatient = async () => {
    try {
        const { data } = await api.get("/patients/me");
        return data as Patient;
    } catch (err: any) {
        if (err.response?.status === 401) {
            console.warn("Utente non autenticato, redirect a /auth");
            if (typeof window !== "undefined") {
                window.location.href = "/auth";
            }
        }
        throw err;
    }
};