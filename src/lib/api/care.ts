
import { Care, CarePayload, CareUpdatePayload } from "@/Types/Types";
import { api } from "./api";

export const getCares = () => api.get("/cares").then(res => res.data);
export const getCareById = (id: number) => api.get(`/cares/byId/${id}`).then(res => res.data);
export const createCare = (data: CarePayload) => api.post("/cares/create", data).then(res => res.data);
export const updateCare = (id: number, data: CareUpdatePayload) => api.patch(`/cares/update/${id}`, data).then(res => res.data);
export const softDeleteCare = (id: number) => api.patch(`/cares/softDelete/${id}`).then(res => res.data);
