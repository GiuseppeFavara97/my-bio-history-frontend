import {
  AllergyPayload,
  AllergyUpdatePayload,
  CarePayload,
  DiagnosisPayload,
  Doctor,
  VaccinesPayload,
} from "@/Types/Types";
import { api } from "./api";

export const createAllergyByDoctor = async (payload: AllergyPayload) => {
  const { data } = await api.post("allergies/create", payload);
  return data;
};

export const createVaccineByDoctor = async (payload: VaccinesPayload) => {
  const { data } = await api.post("vaccines/create", payload);
  return data;
};

export const createDiagnosisByDoctor = async (payload: DiagnosisPayload) => {
  const { data } = await api.post("diagnosis/create", payload);
  return data;
};

export const createCareByDoctor = async (payload: CarePayload) => {
  const { data } = await api.post("cares/create", payload);
  return data;
};

export const updateAllergyByDoctor = async (payload: AllergyUpdatePayload, id: number) => {
  const { data } = await api.patch(`allergies/update/${id}`, payload);
  return data;
};

export const updateDiagnosisByDoctor = async (payload: AllergyUpdatePayload, id: number) => {
  const { data } = await api.patch(`diagnosis/update/${id}`, payload);
  return data;
};

export const getPatientsByDoctorId = async (id: number) => {
  const { data } = await api.get(`doctors/${id}/patients`);
  return data;
};

export const getPatientsByDoctorIdFilter = async (id: number, firstName?: string, lastName?: string) => {
  const { data } = await api.get(`doctors/${id}/patients`, {
    params: { firstName, lastName },
  });
  return data;
};

export const getCurrentDoctor = async () => {
  const { data } = await api.get("doctors/me");
  return data as Doctor;
};
