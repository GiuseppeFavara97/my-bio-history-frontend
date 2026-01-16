import { Patient } from "@/Types/Types";
import { api } from "./api";

export const getPatients = async () => {
    const { data } = await api.get("patients");
    return data;
};

export const getPatientById = async (id: string | number) => {
    const { data } = await api.get(`patients/byId/${id}`);
    return data;
};

export const addDoctorToPatient = async (doctorId: number) => {
    const { data } = await api.post(`patients/addDoctor/${doctorId}`);
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
    const { data } = await api.patch(`patients/softDelete/${id}`);
    return data;
};

export const deletePatient = async (id: number) => {
    await api.delete(`patients/${id}`);
};

export const getCurrentPatient = async () => {
    const { data } = await api.get("patients/me");
    return data as Patient;
};

export const getMyDoctors = async () => {
    const { data } = await api.get("patients/my-doctors");
    return data;
};
