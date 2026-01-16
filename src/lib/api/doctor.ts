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

export const getMyPatients = async () => {
  const { data } = await api.get("doctors/my-patients");
  return data;
};

export const getPatientsByDoctorIdFilter = async (id: number, firstName?: string, lastName?: string, taxCode?: string) => {
  const { data } = await api.get(`doctors/${id}/patients/search`, {
    params: { firstName, lastName, taxCode },
  });
  return data;
};

export const getCurrentDoctor = async () => {
  const { data } = await api.get("doctors/me");
  return data as Doctor;
};

export const getDoctorById = async (id: number) => {
  const { data } = await api.get(`doctors/byId/${id}`);
  return data as Doctor;
};

export const getAllDoctors = async (lastName?: string, place?: string, specialization?: string) => {
  const { data } = await api.get("doctors", {
    params: { lastName, place, specialization },
  });
  return data as Doctor[];
};

export const updateDoctor = async (id: number, payload: any) => {
  const { data } = await api.patch(`doctors/update/${id}`, payload);
  return data as Doctor;
};

export const deleteDoctor = async (id: number) => {
  await api.delete(`doctors/${id}`);
};

export const softDeleteDoctor = async (id: number) => {
  const { data } = await api.patch(`doctors/softDelete/${id}`);
  return data as Doctor;
};

export const associateDoctorAndPatient = async (doctorId: number, patientId: number) => {
  const { data } = await api.post(`doctors/${doctorId}/patients/${patientId}`);
  return data;
};

export const removePatientAssociation = async (doctorId: number, patientId: number) => {
  await api.delete(`doctors/${doctorId}/patients/${patientId}`);
};

export const getDoctorsByPatientId = async (patientId: number) => {
  const { data } = await api.get(`doctors/patient/${patientId}`);
  return data as Doctor[];
};
