import { AppointmentCreateDTO, AppointmentResponseDTO, AppointmentUpdateDTO } from "@/Types/Types";
import { api } from "./api";

export const createAppointment = async (dto: AppointmentCreateDTO) => {
  const { data } = await api.post("appointments/create", dto);
  return data as AppointmentResponseDTO;
};

export const getAllAppointments = async () => {
  const { data } = await api.get("appointments");
  return data as AppointmentResponseDTO[];
};

export const getMyPatientAppointments = async () => {
  const { data } = await api.get("appointments/patient/me");
  return data as AppointmentResponseDTO[];
};

export const getMyDoctorAppointments = async () => {
  const { data } = await api.get("appointments/doctor/me");
  return data as AppointmentResponseDTO[];
};

export const updateAppointment = async (id: number, dto: AppointmentUpdateDTO) => {
  const { data } = await api.patch(`appointments/update/${id}`, dto);
  return data as AppointmentResponseDTO;
};

export const deleteAppointment = async (id: number) => {
  await api.delete(`appointments/delete/${id}`);
};

export const softDeleteAppointment = async (id: number) => {
  const { data } = await api.patch(`appointments/softDelete/${id}`);
  return data as AppointmentResponseDTO;
};
