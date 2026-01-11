import { Patient } from "@/Types/Types";
import { api } from "./api";

export const getPatients = async () => {
    const { data } = await api.get("patients");
    return data;
};

export const getPatientById = async (id: string) => {
    const { data } = await api.get(`patients/getById/${id}`);
    return data;
};

export const createPatient = async (patientData: any) => {
    const { data } = await api.post("patients/create", patientData);
    return data;
};

export const updatePatient = async (id: number, patientData: Partial<Patient>) => {
    const { data } = await api.patch(`patients/update/${id}`, patientData);
    return data;
};

export const softDeletePatient = async (id: number) => {
    const { data } = await api.delete(`patients/softDelete/${id}`);
    return data;
};

export const getCurrentPatient = async () => {
    const { data } = await api.get("patients/me");
    return data as Patient;
};
