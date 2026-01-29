'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Patient, Allergy, Vaccine, Diagnosis, Care, MedicalRecord } from "@/Types/Types";
import { ClipboardClock, PillBottle, Syringe, Upload, Activity, ChevronRight } from "lucide-react";
import { getMedicalRecordById } from "@/lib/api/medicalRecord";

interface PatientHomeProps {
    patient: Patient | null;
    setMainArea: (area: any) => void;
}

export default function PatientHome({ patient, setMainArea }: PatientHomeProps) {
    const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);

    useEffect(() => {
        if (patient?.medicalRecordId) {
            getMedicalRecordById(patient.medicalRecordId)
                .then(setMedicalRecord)
                .catch(console.error);
        }
    }, [patient?.medicalRecordId]);

    if (!patient) return null;

    const allergies = medicalRecord?.allergies || patient.medicalRecord?.allergies || patient.allergies || [];
    const vaccines = medicalRecord?.vaccines || patient.medicalRecord?.vaccines || patient.vaccines || [];
    const upload = medicalRecord?.upload || patient.medicalRecord?.upload || patient.upload || [];
    const diagnoses = medicalRecord?.diagnosis || patient.medicalRecord?.diagnosis || [];
    const cares = medicalRecord?.cares || patient.medicalRecord?.cares || [];

    // Ultima diagnosi (la più recente per data di creazione)
    const latestDiagnosis = diagnoses.length > 0
        ? [...diagnoses].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        : null;

    // Terapie attive (associate all'ultima diagnosi o tutte se non c'è collegamento)
    const activeCares = cares.filter((c: Care) => !c.softDeleted);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">La mia Cartella Clinica</h2>
                <p className="text-gray-500">Benvenuto, ecco un riepilogo della tua situazione clinica.</p>
            </div>

            {/* In Evidenza: Diagnosi e Terapie */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-md border-t-4 border-t-purple-500">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Activity className="h-6 w-6 text-purple-500" />
                            Diagnosi Recenti
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {latestDiagnosis ? (
                                <div className="flex flex-col space-y-1 p-3 bg-purple-50 rounded-lg">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-sm text-purple-900">{latestDiagnosis.pathologyName}</span>
                                        <span className="text-xs text-purple-600 font-medium">{new Date(latestDiagnosis.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs text-gray-700 line-clamp-2">{latestDiagnosis.description}</p>
                                    {latestDiagnosis.doctor && (
                                        <p className="text-xs text-purple-500 mt-1">Dr. {latestDiagnosis.doctor.lastName} {latestDiagnosis.doctor.firstName}</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-8 italic">Nessuna diagnosi registrata</p>
                            )}
                            {diagnoses.length > 1 && (
                                <p className="text-xs text-gray-500 text-center">Totale diagnosi: {diagnoses.length}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-t-4 border-t-orange-500">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <ClipboardClock className="h-6 w-6 text-orange-500" />
                            Terapie in Corso
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeCares.length > 0 ? (
                                activeCares.slice(0, 3).map((c: Care) => {
                                    // Calcola data fine dalla diagnosi associata + durata giorni
                                    const linkedDiagnosis = diagnoses.find((d: Diagnosis) => d.id === c.diagnosisId);
                                    const startDate = linkedDiagnosis ? new Date(linkedDiagnosis.createdAt) : null;
                                    const endDate = startDate && c.durationDays
                                        ? new Date(startDate.getTime() + Number(c.durationDays) * 86400000)
                                        : null;

                                    return (
                                        <div key={c.id} className="flex flex-col space-y-1 p-3 bg-orange-50 rounded-lg">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-sm text-orange-900">{c.description}</span>
                                                <Badge variant="secondary" className="bg-orange-200 text-orange-900 hover:bg-orange-200">{c.durationDays} gg</Badge>
                                            </div>
                                            <p className="text-xs text-orange-800">Frequenza: {c.dailyFrequency} volte al giorno</p>
                                            {endDate && (
                                                <p className="text-xs text-orange-600">
                                                    Fine terapia: {endDate.toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-8 italic">Nessuna terapia attiva</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Altri dati ad elenco */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Altri dati clinici</h3>
                <div className="grid grid-cols-1 gap-3">
                    <ListSummaryItem 
                        icon={<PillBottle className="text-red-500" />}
                        label="Allergie"
                        count={allergies?.length || 0}
                        onClick={() => setMainArea("allergy")}
                        preview={allergies?.slice(0, 2).map(a => a.allergen).join(", ")}
                    />
                    <ListSummaryItem 
                        icon={<Syringe className="text-blue-500" />}
                        label="Vaccini"
                        count={vaccines?.length || 0}
                        onClick={() => setMainArea("vaccini")}
                        preview={vaccines?.slice(0, 2).map(v => v.name).join(", ")}
                    />
                    <ListSummaryItem 
                        icon={<Upload className="text-green-500" />}
                        label="Documenti"
                        count={upload?.length || 0}
                        onClick={() => setMainArea("documenti")}
                        preview={upload?.slice(0, 2).map(d => d.name).join(", ")}
                    />
                </div>
            </div>
        </div>
    );
}

function ListSummaryItem({ icon, label, count, onClick, preview }: { 
    icon: React.ReactNode; 
    label: string; 
    count: number; 
    onClick: () => void;
    preview?: string;
}) {
    return (
        <div 
            onClick={onClick}
            className="flex items-center justify-between p-4 bg-white border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
        >
            <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                    {icon}
                </div>
                <div>
                    <span className="font-semibold block text-gray-800">{label}</span>
                    {preview && <span className="text-xs text-gray-500 italic">{preview}</span>}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-bold">{count}</Badge>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    );
}

