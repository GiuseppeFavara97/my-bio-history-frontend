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
  diagnosis: Diagnosis[];
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
  medicalRecordId:number;
  medicalRecord: MedicalRecord;
}

export type Allergy = {
  id: number;
  allergen: string;
  note: string;
  reaction: string;
  severity: Severity;
  end_date: Date;
  startDate: Date;
  patientId?: number;
  softDelete: boolean;
  doctor: Doctor;
  patient: Patient;
  medicalRecord: MedicalRecord;
};

export type AllergyFormData = {
  allergen: string;
  reaction: string;
  startDate: Date;
  note: string;
  severity: Severity;
};

export type AllergyPayload = {
  allergen?: string;
  reaction?: string;
  startDate?: Date;
  note?: string;
  severity?: string;
  medicalRecordId: number;
  doctorId?: number;
  patientId?: number;
};
export type AllergyUpdatePayload = {
  allergen?: string;
  reaction?: string;
  startDate?: Date;
  note?: string;
  severity?: string;
  doctorId?: number;
  patientId?: number;
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
  diagnosisId:number
};
export type CareFormData = {
  description: string;
  durationDays: string | number;
  dailyFrequency: number | string;
  diagnosisId:number
};
export type CarePayload = {
  description: string;
  durationDays: string | number;
  dailyFrequency: number | string;
  medicalRecordId: number;
  patientId?: number;
  doctorId?: number;
};

export type CareUpdatePayload= Omit<CarePayload,"medicalRecordId">

export type Diagnosis = {
  id: number;
  pathologyName: string;
  description: string;
  softDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  doctor: Doctor;
  medicalRecord: MedicalRecord;
  cares:Care[]
  
};

export type DiagnosisFormData = {
  pathologyName: string;
  description: string;
};

export type DiagnosisPayload = {
  pathologyName: string;
  description: string;
  doctorId?: number;
  patientId?: number;
  medicalRecordId: number;
};
export type DiagnosisUpdatePayload = Omit<DiagnosisPayload, "medicalRecordId">;

export type Vaccine = {
  id: number;
  name: string;
  vaccinationBooster: Date;
  type: string;
  vaccinationDate: Date;
  softDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  doctor: Doctor;
  patient: Patient;
  medicalRecord: MedicalRecord;
};

export type VaccinesFormData = {
  name?: string;
  type?: string;
  vaccinationDate?: Date;
  vaccinationBooster?: Date;
};
export type VaccinesPayload = {
  name?: string;
  type?: string;
  vaccinationDate?: Date;
  vaccinationBooster?: Date;
  doctorId?: number;
  patientId?: number;
  medicalRecordId: number;
};
export type VaccinesUpdatePayload = {
  name?: string;
  type?: string;
  vaccinationDate?: Date;
  vaccinationBooster?: Date;
  doctorId?: number;
  patientId?: number;
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

export type oldDoctor = {
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

export type Doctor = {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string | Date | null;
  phoneNumber: string;
  place: string;
  province: string;
  municipality: string;
  state: string;
  sex: string | null;
  taxCode: string;
  licenseNumber: string;
  specialization: string;
  medicalRecordId: number | null;
  softDeleted: boolean;
  createdAt: string | Date;
  updatedAt: string | Date | null;
  patients: Patient[];
};
export type DoctorAuthData = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
};
