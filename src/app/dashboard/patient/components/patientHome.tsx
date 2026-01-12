'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Patient, Allergy, Vaccine, Diagnosis, Care } from "@/Types/Types";
import { ClipboardClock, PillBottle, Syringe, Upload, Activity } from "lucide-react";

interface PatientHomeProps {
    patient: Patient | null;
}

export default function PatientHome({ patient }: PatientHomeProps) {
    if (!patient) return null;

    const { allergies, vaccines, upload, medicalRecord } = patient;
    const diagnoses = medicalRecord?.diagnosis || [];
    const cares = medicalRecord?.cares || [];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">La mia Cartella Clinica</h2>
                <p className="text-gray-500">Benvenuto, ecco un riepilogo della tua storia clinica.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Allergies Card */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Allergie</CardTitle>
                        <PillBottle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{allergies?.length || 0}</div>
                        <div className="mt-2 space-y-1">
                            {allergies && allergies.length > 0 ? (
                                allergies.slice(0, 3).map((a: Allergy) => (
                                    <div key={a.id} className="text-xs flex justify-between items-center bg-red-50 p-1 rounded">
                                        <span className="font-semibold">{a.allergen}</span>
                                        <Badge variant="outline" className="text-[10px] scale-90">{a.severity}</Badge>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400">Nessuna allergia registrata</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Vaccines Card */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Vaccini</CardTitle>
                        <Syringe className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{vaccines?.length || 0}</div>
                        <div className="mt-2 space-y-1">
                            {vaccines && vaccines.length > 0 ? (
                                vaccines.slice(0, 3).map((v: Vaccine) => (
                                    <div key={v.id} className="text-xs flex justify-between items-center bg-blue-50 p-1 rounded">
                                        <span className="font-semibold">{v.name}</span>
                                        <span>{v.vaccinationDate ? new Date(v.vaccinationDate).toLocaleDateString() : '-'}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400">Nessun vaccino registrato</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Documents Card */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Documenti</CardTitle>
                        <Upload className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{upload?.length || 0}</div>
                        <div className="mt-2 space-y-1">
                            {upload && upload.length > 0 ? (
                                upload.slice(0, 3).map((doc) => (
                                    <div key={doc.id} className="text-xs flex justify-between items-center bg-green-50 p-1 rounded">
                                        <span className="truncate pr-2">{doc.name}</span>
                                        <span className="text-[10px] text-gray-500 uppercase">{doc.type}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400">Nessun documento caricato</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Diagnoses */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Activity className="h-5 w-5 text-purple-500" />
                            Diagnosi Recenti
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {diagnoses.length > 0 ? (
                                diagnoses.slice(0, 5).map((d: Diagnosis) => (
                                    <div key={d.id} className="flex flex-col space-y-1">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-sm">{d.pathologyName}</span>
                                            <span className="text-xs text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-2">{d.description}</p>
                                        <Separator className="mt-2" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-4">Nessuna diagnosi trovata</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Cares/Terapie */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ClipboardClock className="h-5 w-5 text-orange-500" />
                            Terapie in corso
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {cares.length > 0 ? (
                                cares.slice(0, 5).map((c: Care) => (
                                    <div key={c.id} className="flex flex-col space-y-1">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-sm">{c.description}</span>
                                            <Badge variant="secondary" className="text-[10px]">{c.durationDays} giorni</Badge>
                                        </div>
                                        <p className="text-xs text-gray-600">Frequenza: {c.dailyFrequency} volte al giorno</p>
                                        <Separator className="mt-2" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-4">Nessuna terapia in corso</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
