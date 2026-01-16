'use client';

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Doctor, AppointmentCreateDTO } from "@/Types/Types";
import { getAllDoctors } from "@/lib/api/doctor";
import { addDoctorToPatient } from "@/lib/api/patient";
import { createAppointment } from "@/lib/api/appointment";
import { Stethoscope, MapPin, Search, User, CalendarDays, TextQuote } from "lucide-react";
import { toast } from "react-hot-toast";

interface DoctorSearchProps {
    patientId: number;
}

export default function DoctorSearch({ patientId }: DoctorSearchProps) {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [filters, setFilters] = useState({
        lastName: "",
        place: "",
        specialization: ""
    });
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [appointmentData, setAppointmentData] = useState({
        appointmentDate: "",
        reason: ""
    });

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const data = await getAllDoctors(filters.lastName, filters.place, filters.specialization);
            setDoctors(data);
        } catch (error) {
            console.error("Errore nel caricamento dei dottori:", error);
            toast.error("Errore nel caricamento dei dottori");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchDoctors();
    };

    const handleAssociateAndBook = async (doctorId: number) => {
        if (!appointmentData.appointmentDate || !appointmentData.reason) {
            toast.error("Inserisci data e motivo dell'appuntamento");
            return;
        }

        setBookingLoading(true);
        try {
            const dto: AppointmentCreateDTO = {
                doctorId,
                appointmentDate: appointmentData.appointmentDate,
                reason: appointmentData.reason
            };

            // Esegue entrambe le operazioni in contemporanea
            await Promise.all([
                addDoctorToPatient(doctorId),
                createAppointment(dto)
            ]);

            toast.success("Dottore associato e appuntamento fissato con successo!");
            setAppointmentData({ appointmentDate: "", reason: "" });
            setSelectedDoctor(null); // Chiude il dialogo (se gestito tramite stato aperto)
        } catch (error) {
            console.error("Errore durante l'operazione:", error);
            toast.error("Si è verificato un errore durante la prenotazione");
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Cerca un Dottore</h2>
                <p className="text-gray-500">Trova il professionista più adatto alle tue esigenze.</p>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <Input
                    placeholder="Cognome"
                    value={filters.lastName}
                    onChange={(e) => setFilters({ ...filters, lastName: e.target.value })}
                />
                <Input
                    placeholder="Luogo"
                    value={filters.place}
                    onChange={(e) => setFilters({ ...filters, place: e.target.value })}
                />
                <Input
                    placeholder="Specializzazione"
                    value={filters.specialization}
                    onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                />
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    <Search className="mr-2 h-4 w-4" />
                    Cerca
                </Button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="col-span-full text-center py-10">Caricamento in corso...</p>
                ) : doctors.length > 0 ? (
                    doctors.map((doctor) => (
                        <Card key={doctor.id} className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-blue-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-500" />
                                    {doctor.firstName} {doctor.lastName}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="h-4 w-4 text-gray-400" />
                                        <span>{doctor.specialization}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span>{doctor.place}, {doctor.province}</span>
                                    </div>
                                </div>
                                <Dialog onOpenChange={(open) => { if(!open) setSelectedDoctor(null); }}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full mt-4" onClick={() => setSelectedDoctor(doctor)}>
                                            Vedi Profilo
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Profilo Dottore & Prenotazione</DialogTitle>
                                        </DialogHeader>
                                        {selectedDoctor && (
                                            <div className="space-y-4 py-4">
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                                        <User className="h-10 w-10 text-blue-600" />
                                                    </div>
                                                    <h3 className="text-xl font-bold">{selectedDoctor.firstName} {selectedDoctor.lastName}</h3>
                                                    <p className="text-blue-600 font-medium">{selectedDoctor.specialization}</p>
                                                </div>
                                                
                                                <div className="space-y-4 border-t pt-4">
                                                    <div className="grid gap-2">
                                                        <label className="text-sm font-medium flex items-center gap-2">
                                                            <CalendarDays className="h-4 w-4 text-gray-400" />
                                                            Data Appuntamento
                                                        </label>
                                                        <Input 
                                                            type="datetime-local" 
                                                            value={appointmentData.appointmentDate}
                                                            onChange={(e) => setAppointmentData({...appointmentData, appointmentDate: e.target.value})}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <label className="text-sm font-medium flex items-center gap-2">
                                                            <TextQuote className="h-4 w-4 text-gray-400" />
                                                            Motivo della visita
                                                        </label>
                                                        <Input 
                                                            placeholder="Esempio: Controllo annuale"
                                                            value={appointmentData.reason}
                                                            onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                                                        />
                                                    </div>
                                                </div>

                                                <Button 
                                                    className="w-full mt-4 bg-green-600 hover:bg-green-700" 
                                                    onClick={() => handleAssociateAndBook(selectedDoctor.id)}
                                                    disabled={bookingLoading}
                                                >
                                                    {bookingLoading ? "Elaborazione..." : "Conferma e Fissa Appuntamento"}
                                                </Button>
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="col-span-full text-center py-10 text-gray-400 italic">Nessun dottore trovato</p>
                )}
            </div>
        </div>
    );
}
