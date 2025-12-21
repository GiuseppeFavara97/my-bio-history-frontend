import { api } from "./api";


export const getMedicalRecord = (id:number) => {
    return api.get(`/medicalRecords/patient/${id}`).then(res => res.data)
}