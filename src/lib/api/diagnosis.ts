import { api } from "./api";


export const softDeleteDiagnosis =(id:number) => api.patch(`/diagnosis/softDelete/${id}`).then(res=>res.data)