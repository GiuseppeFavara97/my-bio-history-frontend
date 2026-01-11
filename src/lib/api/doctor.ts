import { AllergyPayload, Doctor, VaccinesPayload } from "@/Types/Types";
import { api } from "./api";

export const createAllergyByDoctor = async (payload: AllergyPayload) => {
  const { data } = await api.post("allergies/create", payload);
  return data;
};

export const createVaccineByDoctor = async (payload: VaccinesPayload) => {
  const { data } = await api.post("vaccines/create", payload);
  return data;
};

export const getCurrentDoctor = async () => {
  const { data } = await api.get("doctors/me");
  return data as Doctor;
};
