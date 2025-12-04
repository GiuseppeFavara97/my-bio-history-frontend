export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  birthday?: Date
  birthdayPlace?: string;
  phoneNumber?: number;
  profileImageUrl?: string
  province?:string
  sex?:string
  taxCode?:string
  
};
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  birthdayPlace: string;
  province: string;
  sex: string;
  phoneNumber: number;
  profileImageUrl?: string;
  taxCode: string;
}

export type MedicalRecord = {
  id: number;
  createdAt: Date;
  allergies: allergies[];
  cares: care[];
  diagnoses: diagnoses[];
  patient: patient;
  vaccines: vaccines[];
};

export type patient = {
  id: number;
  mainPatientId?: number;
  fullName: string;
  address: string;
  relationToMainPatient?: string;
};

export type allergies = {
  id: number;
  allergen: string;
  note: string;
  reaction: string;
  severity: string;
  end_date: Date;
  start_date: Date;
};

export type care = {
  id: number;
  name: string;
  description: string;
  duration_days: string | number;
  daily_frequency: number | string;
};

export type diagnoses = {
  id: number;
  pathologyName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type vaccines = {
  id: number;
  name: string;
  note: string;
  type: number;
  vaccinationDate?: Date;
};
