"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, Save, X, Plus, Trash } from "lucide-react";
import { getCurrentPatient } from "@/lib/api/patient";
import { getVaccinesByPatientId, createVaccine, updateVaccine, softDeleteVaccine } from "@/lib/api/vaccine";
import { Vaccine, Patient } from "@/Types/Types";

export default function VaccinePage() {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [vaccines, setVaccines] = useState<Vaccine[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [search, setSearch] = useState("");
    const [editData, setEditData] = useState({
        name: "",
        vaccinationBooster: "",
        type: 0,
        vaccinationDate: "",
        createdAt: "",
    });

    useEffect(() => {
        fetchPatientAndVaccines();
    }, []);

    async function fetchPatientAndVaccines() {
        setLoading(true);
        try {
            const currentPatient = await getCurrentPatient();
            setPatient(currentPatient);
            const vaccinesData = await getVaccinesByPatientId(currentPatient.id);
            setVaccines(vaccinesData);
        } catch (error) {
            console.error(error);
            toast.error("Errore nel caricamento dei vaccini.");
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return vaccines;
        return vaccines.filter(vaccine =>
            vaccine.name.toLowerCase().includes(q) ||
            (vaccine.type === 1 ? "type 1" : "type 2").includes(q)
        );
    }, [search, vaccines]);

    function startEditing(vaccine: Vaccine) {
        setEditingId(vaccine.id);
        setCreating(false);
        setEditData({
            name: vaccine.name,
            vaccinationBooster: vaccine.vaccinationBooster ? new Date(vaccine.vaccinationBooster).toISOString().slice(0, 10) : "",
            type: vaccine.type,
            vaccinationDate: vaccine.vaccinationDate ? new Date(vaccine.vaccinationDate).toISOString().slice(0, 10) : "",
            createdAt: vaccine.createdAt ? new Date(vaccine.createdAt).toISOString().slice(0, 10) : "",
        });
    }

    function cancelEditing() {
        setEditingId(null);
        setCreating(false);
        setEditData({ name: "", vaccinationBooster: "", type: 0, vaccinationDate: "", createdAt: "" });
    }

    async function saveVaccine(vaccineId: number) {
        try {
            const updatedVaccine = await updateVaccine(vaccineId, editData);
            setVaccines(vaccines.map(v => v.id === vaccineId ? updatedVaccine : v));
            toast.success("Vaccino aggiornato con successo.");
            cancelEditing();
        } catch (error) {
            console.error(error);
            toast.error("Errore durante l'aggiornamento.");
        }
    }

    async function addVaccine() {
        if (!patient) return;
        try {
            const newVaccine = await createVaccine({ ...editData, patientId: patient.id });
            setVaccines(prev => [newVaccine, ...prev]);
            toast.success("Vaccino creato con successo.");
            cancelEditing();
        } catch (error) {
            console.error(error);
            toast.error("Errore durante la creazione.");
        }
    }

    async function deleteVaccine(vaccineId: number) {
        if (!confirm("Sei sicuro di voler eliminare questo vaccino?")) return;
        try {
            await softDeleteVaccine(vaccineId);
            setVaccines(prev => prev.filter(v => v.id !== vaccineId));
            toast.success("Vaccino eliminato con successo.");
        } catch (error) {
            console.error(error);
            toast.error("Errore durante l'eliminazione.");
        }
    }

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold">Pannello Vaccini</h2>
                    <p className="text-sm text-slate-500">Gestisci i tuoi vaccini.</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Cerca per nome o tipo"
                        className="w-full sm:w-80 pl-3 py-2 border rounded-md text-sm"
                    />
                    <button onClick={fetchPatientAndVaccines} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md text-sm">
                        Aggiorna
                    </button>
                    <button onClick={() => { setCreating(true); setEditingId(null); setEditData({ name: "", vaccinationBooster: "", type: 0, vaccinationDate: "", createdAt: "" }); }}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md text-sm">
                        <Plus size={16} /> Nuovo
                    </button>
                </div>
            </div>

            <div className="bg-white border rounded-md overflow-auto">
                <table className="min-w-full divide-y">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Nome</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Tipo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Data Vaccinazione</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Rinnovo</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-600">Azioni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">Caricamento...</td>
                            </tr>
                        ) : (
                            <>
                                {creating && (
                                    <tr>
                                        <td className="px-4 py-3 text-sm font-medium">
                                            <input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            <input type="number" value={editData.type} onChange={e => setEditData({ ...editData, type: parseInt(e.target.value) })} className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-500">
                                            <input type="date" value={editData.vaccinationDate} onChange={e => setEditData({ ...editData, vaccinationDate: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-500">
                                            <input type="date" value={editData.vaccinationBooster} onChange={e => setEditData({ ...editData, vaccinationBooster: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-right flex gap-2 justify-end">
                                            <button onClick={addVaccine} className="text-green-600 hover:text-green-800"><Save size={18} /></button>
                                            <button onClick={cancelEditing} className="text-red-600 hover:text-red-800"><X size={18} /></button>
                                        </td>
                                    </tr>
                                )}

                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">Nessun vaccino trovato.</td>
                                    </tr>
                                ) : (
                                    filtered.map(v => (
                                        <tr key={v.id}>
                                            <td className="px-4 py-3 text-sm font-medium">
                                                {editingId === v.id ? (
                                                    <input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : v.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">
                                                {editingId === v.id ? (
                                                    <input type="number" value={editData.type} onChange={e => setEditData({ ...editData, type: parseInt(e.target.value) })} className="w-full px-2 py-1 border rounded" />
                                                ) : (v.type === 1 ? "Tipo 1" : "Tipo 2")}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">
                                                {editingId === v.id ? (
                                                    <input type="date" value={editData.vaccinationDate} onChange={e => setEditData({ ...editData, vaccinationDate: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : v.vaccinationDate ? new Date(v.vaccinationDate).toLocaleDateString() : ""}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">
                                                {editingId === v.id ? (
                                                    <input type="date" value={editData.vaccinationBooster} onChange={e => setEditData({ ...editData, vaccinationBooster: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : v.vaccinationBooster ? new Date(v.vaccinationBooster).toLocaleDateString() : ""}
                                            </td>
                                            <td className="px-4 py-3 text-right flex gap-2 justify-end">
                                                {editingId === v.id ? (
                                                    <>
                                                        <button onClick={() => saveVaccine(v.id)} className="text-green-600 hover:text-green-800"><Save size={18} /></button>
                                                        <button onClick={cancelEditing} className="text-red-600 hover:text-red-800"><X size={18} /></button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => startEditing(v)} className="text-blue-600 hover:text-blue-800"><Edit2 size={18} /></button>
                                                        <button onClick={() => deleteVaccine(v.id)} className="text-red-600 hover:text-red-800"><Trash size={18} /></button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}