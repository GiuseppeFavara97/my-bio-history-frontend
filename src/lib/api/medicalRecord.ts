import { api } from "./api";


export const getMedicalRecordById = (id:number) => {
    return api.get(`/medicalRecords/patient/${id}`).then(res => res.data)
}