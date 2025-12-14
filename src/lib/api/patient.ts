import { Patient } from "@/Types/Types";
import { api } from "./api";

export const getPatients = () => api.get("/patients").then(res => res.data);
export const getPatientById = (id: string) => api.get(`/patients/${id}`).then(res => res.data);
export const createPatient = (data: any) => api.post("/patients/create", data).then(res => res.data);
export const updatePatient = (id: number, data: Partial<Patient>) => api.patch(`/patients/update/${id}`, data).then(res => res.data);
export const softDeletePatient = (id: number) => api.delete(`/patients/softDelete/${id}`).then(res => res.data);
export const getCurrentPatient = async () => {
    const { data } = await api.get("/patients/me");
    return data as Patient;
};