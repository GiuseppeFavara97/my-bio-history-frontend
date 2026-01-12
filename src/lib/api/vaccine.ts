import { Vaccine } from "@/Types/Types";
import { api } from "./api";

export const getVaccines = async () => {
    const { data } = await api.get("vaccines");
    return data;
};

export const getVaccineById = async (id: number) => {
    const { data } = await api.get(`vaccines/${id}`);
    return data;
};

export const createVaccine = async (vaccineData: any) => {
    const { data } = await api.post("vaccines/create", vaccineData);
    return data;
};

export const updateVaccine = async (id: number, vaccineData: Partial<Vaccine>) => {
    const { data } = await api.patch(`vaccines/update/${id}`, vaccineData);
    return data;
};

export const softDeleteVaccine = async (id: number) => {
    const { data } = await api.delete(`vaccines/softDelete/${id}`);
    return data;
};

export const getVaccinesByPatientId = async (patientId: number) => {
    const { data } = await api.get(`vaccines/patient/${patientId}`);
    return data;
};
