'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  getMyPatientAppointments, 
  createAppointment,
  updateAppointment,
  softDeleteAppointment
} from "@/lib/api/appointment";
import { AppointmentResponseDTO, AppointmentCreateDTO, AppointmentUpdateDTO } from "@/Types/Types";
import { 
  CalendarDays, 
  Clock, 
  TextQuote, 
  User, 
  Plus, 
  Edit2, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";
import { toast } from "sonner";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState<AppointmentResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentResponseDTO | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getMyPatientAppointments();
      setAppointments(data || []);
    } catch (error: any) {
      console.error("Errore nel caricamento:", error);
      toast.error("Errore nel caricamento degli appuntamenti");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    try {
      setIsSubmitting(true);
      const appointmentData: AppointmentCreateDTO = {
        doctorId: parseInt(formData.doctorId),
        patientId: 1, // TODO: ricavare da user loggato
        appointmentDate: `${formData.appointmentDate}T${formData.appointmentTime}:00`,
        reason: formData.reason,
      };

      await createAppointment(appointmentData);
      toast.success("Appuntamento prenotato con successo!");
      setIsBookingOpen(false);
      setFormData({ doctorId: "", appointmentDate: "", appointmentTime: "", reason: "" });
      await fetchAppointments();
    } catch (error: any) {
      console.error("Errore:", error);
      toast.error(error?.response?.data?.message || "Errore nella prenotazione");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAppointment = async () => {
    if (!selectedAppointment) return;
    try {
      setIsSubmitting(true);
      const updateData: AppointmentUpdateDTO = {
        appointmentDate: `${formData.appointmentDate}T${formData.appointmentTime}:00`,
        reason: formData.reason,
      };

      await updateAppointment(selectedAppointment.id, updateData);
      toast.success("Appuntamento modificato con successo!");
      setIsEditOpen(false);
      setSelectedAppointment(null);
      await fetchAppointments();
    } catch (error: any) {
      console.error("Errore:", error);
      toast.error("Errore nella modifica dell'appuntamento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAppointment = async () => {
    if (!selectedAppointment) return;
    try {
      setIsSubmitting(true);
      await softDeleteAppointment(selectedAppointment.id);
      toast.success("Appuntamento eliminato con successo!");
      setIsDeleteOpen(false);
      setSelectedAppointment(null);
      await fetchAppointments();
    } catch (error: any) {
      console.error("Errore:", error);
      toast.error("Errore nell'eliminazione dell'appuntamento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (appointment: AppointmentResponseDTO) => {
    setSelectedAppointment(appointment);
    const dateTime = new Date(appointment.startTime);
    setFormData({
      doctorId: appointment.doctorId.toString(),
      appointmentDate: dateTime.toISOString().split('T')[0],
      appointmentTime: dateTime.toTimeString().slice(0, 5),
      reason: appointment.reason || "",
    });
    setIsEditOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 flex items-center gap-1 w-fit">
            <Clock className="h-3 w-3" />
            In Attesa
          </Badge>
        );
      case 'CONFIRMED':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1 w-fit">
            <CheckCircle className="h-3 w-3" />
            Confermato
          </Badge>
        );
      case 'CANCELLED':
        return (
          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
            <X className="h-3 w-3" />
            Annullato
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatistics = () => {
    const total = appointments.length;
    const pending = appointments.filter(a => a.status === 'PENDING').length;
    const confirmed = appointments.filter(a => a.status === 'CONFIRMED').length;
    const cancelled = appointments.filter(a => a.status === 'CANCELLED').length;
    return { total, pending, confirmed, cancelled };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <CalendarDays className="h-10 w-10 text-blue-600" />
            I Miei Appuntamenti
          </h1>
          <p className="text-gray-600 mt-2">Gestisci le tue visite mediche in modo semplice e veloce</p>
        </div>

        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg h-12 px-6 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Prenota Appuntamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Prenota un Appuntamento</DialogTitle>
              <DialogDescription>
                Seleziona il dottore e la data per prenotare la tua visita
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="grid gap-2">
                <Label htmlFor="doctorId" className="font-semibold">Scegli il Dottore</Label>
                <Input
                  id="doctorId"
                  type="number"
                  placeholder="ID Dottore"
                  value={formData.doctorId}
                  onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date" className="font-semibold">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time" className="font-semibold">Ora</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason" className="font-semibold">Motivo della Visita</Label>
                <Textarea
                  id="reason"
                  placeholder="Descrivi brevemente il motivo della visita..."
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                Annulla
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleBookAppointment}
                disabled={!formData.doctorId || !formData.appointmentDate || !formData.appointmentTime || !formData.reason || isSubmitting}
              >
                {isSubmitting ? "Prenotazione..." : "Prenota Ora"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Attesa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Confermati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.confirmed}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Annullati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {loading ? (
          <Card className="bg-white">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="animate-spin h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
              </div>
              <p className="text-gray-500">Caricamento appuntamenti...</p>
            </CardContent>
          </Card>
        ) : appointments.length > 0 ? (
          appointments.map((app) => (
            <Card 
              key={app.id} 
              className="bg-white hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <CalendarDays className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-bold text-lg text-gray-900">Appuntamento #{app.id}</h3>
                          {getStatusBadge(app.status)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Data e Ora</p>
                          <p className="font-semibold">
                            {new Date(app.startTime).toLocaleDateString('it-IT', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })} - {new Date(app.startTime).toLocaleTimeString('it-IT', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Dottore</p>
                          <p className="font-semibold">ID: {app.doctorId}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <TextQuote className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-700 italic">{app.reason || "Nessuna descrizione"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex lg:flex-col gap-2 lg:justify-start">
                    {app.status !== 'CANCELLED' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full lg:w-auto flex items-center gap-2"
                          onClick={() => openEditDialog(app)}
                        >
                          <Edit2 className="h-4 w-4" />
                          Modifica
                        </Button>
                        <Dialog open={isDeleteOpen && selectedAppointment?.id === app.id} onOpenChange={setIsDeleteOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-full lg:w-auto flex items-center gap-2"
                              onClick={() => setSelectedAppointment(app)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Elimina
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                Conferma Eliminazione
                              </DialogTitle>
                              <DialogDescription>
                                Sei sicuro di voler eliminare questo appuntamento? Non potrai annullare questa azione.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <p className="text-sm text-red-800">
                                <strong>Data:</strong> {new Date(app.startTime).toLocaleString('it-IT')}<br />
                                <strong>Dottore:</strong> ID {app.doctorId}<br />
                                <strong>Motivo:</strong> {app.reason}
                              </p>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {
                                setIsDeleteOpen(false);
                                setSelectedAppointment(null);
                              }}>
                                Annulla
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={handleDeleteAppointment}
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Eliminazione..." : "Elimina"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-white">
            <CardContent className="p-12">
              <div className="text-center">
                <CalendarDays className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-medium mb-2">Nessun appuntamento prenotato</p>
                <p className="text-gray-400 text-sm">Clicca sul pulsante "Prenota Appuntamento" per prenotare la tua prima visita</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Modifica Appuntamento</DialogTitle>
            <DialogDescription>
              Aggiorna i dettagli della tua visita
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-date" className="font-semibold">Data</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-time" className="font-semibold">Ora</Label>
              <Input
                id="edit-time"
                type="time"
                value={formData.appointmentTime}
                onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-reason" className="font-semibold">Motivo della Visita</Label>
              <Textarea
                id="edit-reason"
                placeholder="Descrivi il motivo della visita..."
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditOpen(false);
              setSelectedAppointment(null);
            }}>
              Annulla
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUpdateAppointment}
              disabled={!formData.appointmentDate || !formData.appointmentTime || !formData.reason || isSubmitting}
            >
              {isSubmitting ? "Modifica in corso..." : "Salva Modifiche"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
