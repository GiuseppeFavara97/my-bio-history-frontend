import { NextResponse } from "next/server";
import { allergies, patient } from "../../../../../Types/Types";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
 const patients:patient = {
  1: {
    id: 1,
    age: 28,
    birthday: new Date("1997-04-30"),
    first_name: "Giuseppe",
    last_name: "Favara",
    municipality: "Catania",
    phone_number: 3270095299,
    province: "CT",
    sex: "M",
    state: "Italia",
    tax_code: "FVRGPP97E30C351A",
    created_at: new Date("2025-12-06T14:15:06"),
    main_patient_id: null,
    relation_to_main_patient: null,
    soft_deleted: false,
    updated_at: null,
    user_id: 3
  },

  2: {
    id: 2,
    age: 28,
    birthday: new Date("1997-04-30"),
    first_name: "Giuseppe",
    last_name: "Favara",
    municipality: "Palermo",
    phone_number: 3270095299,
    province: "PA",
    sex: "M",
    state: "Italia",
    tax_code: "FVRGPP97E30C351B",
    created_at: new Date("2025-12-06T14:24:17"),
    main_patient_id: null,
    relation_to_main_patient: null,
    soft_deleted: false,
    updated_at: null,
    user_id: 6
  },

  3: {
    id: 3,
    age: 40,
    birthday: new Date("1985-10-14"),
    first_name: "Alex",
    last_name: "Rossi",
    municipality: "Milano",
    phone_number: 3209876543,
    province: "MI",
    sex: "M",
    state: "Italia",
    tax_code: "RSSLXA85R14F205X",
    created_at: new Date("2025-12-06T14:27:02"),
    main_patient_id: null,
    relation_to_main_patient: null,
    soft_deleted: false,
    updated_at: null,
    user_id: 7
  }
};

  
  
  const result = patients[id]
  
  return NextResponse.json(result)
}
