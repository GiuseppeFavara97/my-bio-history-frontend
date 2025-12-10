import { Patient} from "../../../Types/Types";
import { api } from "./api";

export const getPatient = (): Promise<Patient[]> => api.get("/patients").then(res => res.data);
export const getPatientById = (id: number): Promise<Patient> => api.get(`/patients/${id}`).then(res => res.data);
export const createPatient = (data: Partial<Patient>): Promise<Patient> => api.post("/patients/create", data).then(res => res.data);
export const updatePatient = (id: number, data: Partial<Patient>): Promise<Patient> => api.patch(`/patients/update/${id}`, data).then(res => res.data);
export const softDeletePatient = (id: number): Promise<void> => api.delete(`/patients/softDelete/${id}`).then(res => res.data);