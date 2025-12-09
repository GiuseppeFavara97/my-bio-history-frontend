export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  birthday?: Date;
  birthdayPlace?: string;
  phoneNumber?: number;
  profileImageUrl?: string;
  province?: string;
  sex?: string;
  taxCode?: string;
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
  age: number;
  birthday: Date;
  first_name: string;
  last_name: string;
  municipality: string;
  phone_number: number;
  province: string;
  sex: string;
  state: string;
  tax_code: string;
  created_at: Date;
  main_patient_id: number;
  relation_to_main_patient: string;
  soft_deleted: boolean;
  updated_at: Date;
  user_id: number;
};

export type allergies = {
  id: number;
  allergen: string;
  note: string;
  reaction: string;
  severity: string;
  end_date: Date;
  start_date: Date;
  patient_id?: number;
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
