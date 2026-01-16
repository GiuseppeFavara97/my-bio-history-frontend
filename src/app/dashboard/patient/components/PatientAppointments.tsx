'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMyPatientAppointments } from "@/lib/api/appointment";
import { AppointmentResponseDTO } from "@/Types/Types";
import { CalendarDays, Clock, TextQuote, User } from "lucide-react";

export default function PatientAppointments() {
    const [appointments, setAppointments] = useState<AppointmentResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getMyPatientAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Errore nel caricamento degli appuntamenti:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'PENDING': return <Badge className="bg-yellow-500">In Attesa</Badge>;
            case 'CONFIRMED': return <Badge className="bg-green-500">Confermato</Badge>;
            case 'CANCELLED': return <Badge variant="destructive">Annullato</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">I Miei Appuntamenti</h2>
                <p className="text-gray-500">Visualizza e gestisci le tue visite prenotate.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <p className="text-center py-10">Caricamento appuntamenti...</p>
                ) : appointments.length > 0 ? (
                    appointments.map((app) => (
                        <Card key={app.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 rounded-full">
                                        <CalendarDays className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-lg">Appuntatamento #{app.id}</span>
                                            {getStatusBadge(app.status)}
                                        </div>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {new Date(app.appointmentDate).toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                ID Dottore: {app.doctorId}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full md:w-auto">
                                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border">
                                        <TextQuote className="h-4 w-4 text-gray-400 mt-1" />
                                        <div className="text-sm italic">"{app.reason}"</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center py-10 text-gray-400 italic bg-white rounded-xl border">Nessun appuntamento trovato</p>
                )}
            </div>
        </div>
    );
}
