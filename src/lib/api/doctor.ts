import { AllergyPayload, Doctor, DoctorAuthData, User, VaccinesPayload } from "@/Types/Types";
import { api } from "./api";

export const createAllergyByDoctor = (payload: AllergyPayload) => {
  return api.post("/allergies/create",payload).then((res) => res.data);
};
export const createVaccineByDoctor = (payload:VaccinesPayload) => {
  return api.post("/vaccines/create",payload).then((res) => res.data);
};
export const getCurrentDoctor = async () => {
  const { data }: { data: Doctor } = await api.get("/doctors/me");
  console.log(data, "dati di autenticazione Dottore");

  return data as Doctor;
};
