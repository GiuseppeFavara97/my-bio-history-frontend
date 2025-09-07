export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type MedicalRecord = {
    patient:patient
}

export type patient = {
    fullName:string
    address:string
}