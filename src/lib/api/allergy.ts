import { Allergy } from "@/Types/Types";
import { api } from "./api";

export const getAllergies = async () => {
    const { data } = await api.get("allergies");
    return data;
};

export const getAllergyById = async (id: number) => {
    const { data } = await api.get(`allergies/${id}`);
    return data;
};

export const createAllergy = async (allergyData: any) => {
    const { data } = await api.post("allergies/create", allergyData);
    return data;
};

export const updateAllergy = async (id: number, allergyData: Partial<Allergy>) => {
    const { data } = await api.patch(`allergies/update/${id}`, allergyData);
    return data;
};

export const softDeleteAllergy = async (id: number) => {
    const { data } = await api.delete(`allergies/softDelete/${id}`);
    return data;
};

export const getAllergiesByPatientId = async (patientId: number) => {
    const { data } = await api.get(`allergies/patient/${patientId}`);
    return data;
};
