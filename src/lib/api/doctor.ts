import {
  AllergyPayload,
  AllergyUpdatePayload,
  CarePayload,
  DiagnosisPayload,
  Doctor,
  DoctorAuthData,
  User,
  VaccinesPayload,
} from "@/Types/Types";
import { api } from "./api";

export const createAllergyByDoctor = (payload: AllergyPayload) => {
  return api.post("/allergies/create", payload).then((res) => res.data);
};
export const createVaccineByDoctor = (payload: VaccinesPayload) => {
  return api.post("/vaccines/create", payload).then((res) => res.data);
};
export const createDiagnosisByDoctor = (payload: DiagnosisPayload) => {
  return api.post("/diagnosis/create", payload).then((res) => res.data);
};

export const createCareByDoctor = (payload: CarePayload) => {
  return api.post("/cares/create", payload).then((res) => res.data);
};
export const updateAllergyByDoctor = (payoload: AllergyUpdatePayload, id: number) => {
  return api.patch(`/allergies/update/${id}`, payoload).then((res) => res.data);
};
export const updateDiagnosisByDoctor = (payoload: AllergyUpdatePayload, id: number) => {
  return api.patch(`/diagnosis/update/${id}`, payoload).then((res) => res.data);
};

export const getPatientsByDoctorId = (id: number) => {
  return api.get(`/doctors/${id}/patients`).then((res) => res.data);
};
export const getPatientsByDoctorIdFilter = (id: number,firstName?:string,lastName?:string) => {
  return api.get(`/doctors/${id}/patients`,{params:{firstName:firstName,lastName:lastName}}).then((res) => res.data);
};
export const getCurrentDoctor = async () => {
  const { data }: { data: Doctor } = await api.get("/doctors/me");
  console.log(data, "dati di autenticazione Dottore");

  return data as Doctor;
};
