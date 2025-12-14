export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  softDeleted: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export enum UserRole {
  ADMIN = "ADMIN",
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
}

export type MedicalRecord = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  softDeleted: boolean;
  allergies: Allergy[];
  cares: Care[];
  diagnoses: Diagnosis[];
  patient: Patient;
  vaccines: Vaccine[];
  upload: UploadFile[];
};

export interface PersonData {
  firstName: string;
  lastName: string;
  state: string;
  municipality: string;
  birthday: Date;
  province: string;
  sex: string;
  taxCode: string;
  phoneNumber: string;
  age: number;
}

export interface Patient extends PersonData {
  id: number;
  mainPatientId: number;
  relationToMainPatient: string;
  softDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  allergies: Allergy[];
  upload: UploadFile[];
  vaccines: Vaccine[];
  user: User;
  medicalRecord: MedicalRecord;
};

export type Allergy = {
  id: number;
  allergen: string;
  note: string;
  reaction: string;
  severity: string;
  end_date: Date;
  startDate: Date;
  patientId?: number;
  softDelete: boolean;
  doctor: Doctor;
  patient: Patient;
  medicalRecord: MedicalRecord;
};

export enum Severity {
  LIEVE = "LIEVE",
  MODERATA = "MODERATA",
  GRAVE = "GRAVE",
}

export type Care = {
  id: number;
  description: string;
  durationDays: string | number;
  dailyFrequency: number | string;
  softDeleted: boolean;
  doctor: Doctor;
  medicalRecord: MedicalRecord;
};

export type Diagnosis = {
  id: number;
  pathologyName: string;
  description: string;
  softDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  doctor: Doctor;
  medicalRecord: MedicalRecord;
};

export type Vaccine = {
  id: number;
  name: string;
  vaccinationBooster: Date;
  type: number;
  vaccinationDate?: Date;
  softDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  doctor: Doctor;
  patient: Patient;
  medicalRecord: MedicalRecord;
};

export type UploadFile = {
  id: number;
  name: string;
  type: string;
  size: number;
  url: string;
  fileData: string;
  softDeleted: boolean;
  doctor: Doctor;
  patient: Patient;
  medicalRecord: MedicalRecord;
};

export type Doctor = {
  id: number;
  specialization: string;
  licenseNumber: string;
  place: string;
  softDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  diagnosis: Diagnosis[];
  care: Care[];
  uploadFile: UploadFile[];
  vaccine: Vaccine[];
};