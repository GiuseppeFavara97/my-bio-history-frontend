'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doctor } from "@/Types/Types";
import { getMyDoctors } from "@/lib/api/patient";
import { Stethoscope, MapPin, User, Phone } from "lucide-react";

export default function VisitedDoctors() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitedDoctors = async () => {
            try {
                const data = await getMyDoctors();
                setDoctors(data);
            } catch (error) {
                console.error("Errore nel caricamento dei dottori visitati:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVisitedDoctors();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">I Miei Dottori</h2>
                <p className="text-gray-500">Elenco dei medici con cui hai effettuato visite.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="col-span-full text-center py-10">Caricamento in corso...</p>
                ) : doctors.length > 0 ? (
                    doctors.map((doctor) => (
                        <Card key={doctor.id} className="border-t-4 border-t-green-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <User className="h-5 w-5 text-green-500" />
                                    {doctor.firstName} {doctor.lastName}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="h-4 w-4 text-gray-400" />
                                        <span className="font-medium">{doctor.specialization}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span>{doctor.place}, {doctor.province}</span>
                                    </div>
                                    <div className="flex items-center gap-2 pt-2 border-t">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span>{doctor.phoneNumber}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="col-span-full text-center py-10 text-gray-400 italic">Nessun dottore registrato tra le tue visite</p>
                )}
            </div>
        </div>
    );
}
