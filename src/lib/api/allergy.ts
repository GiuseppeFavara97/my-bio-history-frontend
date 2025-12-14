import { Allergy } from "@/Types/Types";
import { api } from "./api";

export const getAllergies = () => api.get("/allergies").then(res => res.data);
export const getAllergyById = (id: number) => api.get(`/allergies/${id}`).then(res => res.data);
export const createAllergy = (data: any) => api.post("/allergies/create", data).then(res => res.data);
export const updateAllergy = (id: number, data: Partial<Allergy>) => api.patch(`/allergies/update/${id}`, data).then(res => res.data);
export const softDeleteAllergy = (id: number) => api.delete(`/allergies/softDelete/${id}`).then(res => res.data);
export const getAllergiesByPatientId = (patientId: number) => api.get(`/allergies/patient/${patientId}`).then(res => res.data);