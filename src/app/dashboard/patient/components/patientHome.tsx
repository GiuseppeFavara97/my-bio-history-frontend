'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Patient, Allergy, Vaccine, Diagnosis, Care } from "@/Types/Types";
import { ClipboardClock, PillBottle, Syringe, Upload, Activity, ChevronRight } from "lucide-react";

interface PatientHomeProps {
    patient: Patient | null;
    setMainArea: (area: any) => void;
}

export default function PatientHome({ patient, setMainArea }: PatientHomeProps) {
    if (!patient) return null;

    const { allergies, vaccines, upload, medicalRecord } = patient;
    const diagnoses = medicalRecord?.diagnosis || [];
    const cares = medicalRecord?.cares || [];

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
                            {diagnoses.length > 0 ? (
                                diagnoses.slice(0, 3).map((d: Diagnosis) => (
                                    <div key={d.id} className="flex flex-col space-y-1 p-3 bg-purple-50 rounded-lg">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-sm text-purple-900">{d.pathologyName}</span>
                                            <span className="text-xs text-purple-600 font-medium">{new Date(d.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-gray-700 line-clamp-2">{d.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-8 italic">Nessuna diagnosi registrata</p>
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
                            {cares.length > 0 ? (
                                cares.slice(0, 3).map((c: Care) => (
                                    <div key={c.id} className="flex flex-col space-y-1 p-3 bg-orange-50 rounded-lg">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-sm text-orange-900">{c.description}</span>
                                            <Badge variant="secondary" className="bg-orange-200 text-orange-900 hover:bg-orange-200">{c.durationDays} gg</Badge>
                                        </div>
                                        <p className="text-xs text-orange-800">Frequenza: {c.dailyFrequency} volte al giorno</p>
                                    </div>
                                ))
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

