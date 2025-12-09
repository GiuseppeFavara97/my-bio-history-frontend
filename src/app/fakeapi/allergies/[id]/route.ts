import { NextResponse } from "next/server";
import { allergies } from "../../../../../Types/Types";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
 const fakeAllergies: allergies[] = [
  {
    id: 1,
    allergen: "Polline",
    note: "Peggiora in primavera",
    reaction: "Starnuti, prurito agli occhi",
    severity: "moderata",
    start_date: new Date("2020-03-15"),
    end_date: new Date("2020-09-30"),
    patient_id: 2
  },
  {
    id: 2,
    allergen: "Acaro della polvere",
    note: "Peggiora di notte",
    reaction: "Tosse, naso chiuso",
    severity: "alta",
    start_date: new Date("2018-01-01"),
    end_date: new Date("2025-01-01"),
    patient_id: 2
  },
  {
    id: 3,
    allergen: "Gatti",
    note: "Reazione immediata al contatto",
    reaction: "Asma e irritazione cutanea",
    severity: "grave",
    start_date: new Date("2021-05-10"),
    end_date: new Date("2024-12-31"),
    patient_id: 2
  },
  {
    id: 4,
    allergen: "Frutta a guscio",
    note: "Reazione dopo ingestione di noci e mandorle",
    reaction: "Gonfiore delle labbra",
    severity: "alta",
    start_date: new Date("2019-10-02"),
    end_date: new Date("2025-10-02"),
    patient_id: 5
  },
  {
    id: 5,
    allergen: "Lattice",
    note: "Rilevata durante un intervento chirurgico",
    reaction: "Dermatite e difficoltà respiratorie",
    severity: "moderata",
    start_date: new Date("2022-07-07"),
    end_date: new Date("2025-07-07"),
    patient_id: 5
  },
  {
    id: 6,
    allergen: "Peli di cane",
    note: "Sintomi lievi, soprattutto al chiuso",
    reaction: "Starnuti e prurito nasale",
    severity: "bassa",
    start_date: new Date("2023-02-12"),
    end_date: new Date("2025-12-31"),
    patient_id: 7
  },
  {
    id: 7,
    allergen: "Graminacee",
    note: "Sintomi accentuati in estate",
    reaction: "Lacrimazione e irritazione oculare",
    severity: "moderata",
    start_date: new Date("2017-06-01"),
    end_date: new Date("2025-09-30"),
    patient_id: 7
  },
  {
    id: 8,
    allergen: "Fragole",
    note: "Reazione cutanea lieve",
    reaction: "Orticaria localizzata",
    severity: "bassa",
    start_date: new Date("2020-04-01"),
    end_date: new Date("2025-04-01"),
    patient_id: 10
  },
  {
    id: 9,
    allergen: "Antibiotico Amoxicillina",
    note: "Reazione avvenuta 12h dopo assunzione",
    reaction: "Rush cutaneo diffuso",
    severity: "alta",
    start_date: new Date("2021-01-15"),
    end_date: new Date("2025-01-15"),
    patient_id: 10
  },
  {
    id: 10,
    allergen: "Crosta di pane / Glutine",
    note: "Possibile sensibilità non celiaca",
    reaction: "Gonfiore addominale e prurito",
    severity: "moderata",
    start_date: new Date("2019-11-11"),
    end_date: new Date("2025-11-11"),
    patient_id: 2
  }
];
  
  
  const result = fakeAllergies.filter(attribute => attribute.patient_id === id);
  
  return NextResponse.json(result)
}
