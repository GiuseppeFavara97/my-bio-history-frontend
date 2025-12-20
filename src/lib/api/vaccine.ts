import { Patient, Vaccine } from "@/Types/Types";
import { api } from "./api";

export const getVaccines = () => api.get("/vaccines").then(res => res.data);
export const getVaccineById = (id: number) => api.get(`/vaccines/${id}`).then(res => res.data);
export const createVaccine = (data: any) => api.post("/vaccines/create", data).then(res => res.data);
export const updateVaccine = (id: number, data: Partial<Vaccine>) => api.patch(`/vaccines/update/${id}`, data).then(res => res.data);
export const softDeleteVaccine = (id: number) => api.delete(`/vaccines/softDelete/${id}`).then(res => res.data);
export const getVaccinesByPatientId = (patientId: number) => api.get(`/vaccines/patient/${patientId}`).then(res => res.data);
export const getCurrentPatient = async () => {
    const { data } = await api.get("/patients/me");
    return data as Patient;
};