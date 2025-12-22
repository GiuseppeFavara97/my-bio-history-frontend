"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, Save, X, Plus, Trash } from "lucide-react";
import { getCurrentPatient } from "@/lib/api/patient";
import { getAllergiesByPatientId, createAllergy, updateAllergy, softDeleteAllergy } from "@/lib/api/allergy";
import { Allergy, Patient } from "@/Types/Types";

export default function AllergyPage() {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [allergies, setAllergies] = useState<Allergy[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [search, setSearch] = useState("");
    const [editData, setEditData] = useState({
        allergen: "",
        reaction: "",
        severity: "",
        note: ""
    });

    useEffect(() => {
        fetchPatientAndAllergies();
    }, []);

    async function fetchPatientAndAllergies() {
        setLoading(true);
        try {
            const currentPatient = await getCurrentPatient();
            setPatient(currentPatient);
            const data = await getAllergiesByPatientId(currentPatient.id);
            setAllergies(data);
        } catch (err) {
            console.error(err);
            toast.error("Errore nel caricamento delle allergie");
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return allergies;
        return allergies.filter(u =>
            u.allergen.toLowerCase().includes(q) || u.reaction.toLowerCase().includes(q)
        );
    }, [allergies, search]);

    function startEditing(allergy: Allergy) {
        setEditingId(allergy.id);
        setEditData({
            allergen: allergy.allergen,
            reaction: allergy.reaction,
            severity: allergy.severity,
            note: allergy.note || ""
        });
    }

    function cancelEditing() {
        setEditingId(null);
        setCreating(false);
        setEditData({ allergen: "", reaction: "", severity: "", note: "" });
    }

    async function saveAllergy(id: number) {
        try {
            const updatedAllergy = await updateAllergy(id, editData);
            setAllergies(prev => prev.map(u => (u.id === id ? { ...u, ...updatedAllergy } : u)));
            toast.success("Allergia aggiornata");
            cancelEditing();
        } catch (err) {
            console.error(err);
            toast.error("Errore di rete");
        }
    }

    async function addAllergy() {
        if (!patient) return;
        try {
            const newAllergy = await createAllergy({ ...editData, patientId: patient.id });
            setAllergies(prev => [newAllergy, ...prev]);
            toast.success("Allergia aggiunta");
            cancelEditing();
        } catch (err) {
            console.error(err);
            toast.error("Errore nell'aggiunta dell'allergia");
        }
    }

    async function deleteAllergy(id: number) {
        if (!confirm("Sei sicuro di voler eliminare questa allergia?")) return;
        try {
            await softDeleteAllergy(id);
            setAllergies(prev => prev.filter(a => a.id !== id));
            toast.success("Allergia eliminata");
        } catch (err) {
            console.error(err);
            toast.error("Errore nell'eliminazione");
        }
    }

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold">Pannello Allergie</h2>
                    <p className="text-sm text-slate-500">Gestisci le tue allergie.</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Cerca per allergene o reazione"
                        className="w-full sm:w-80 pl-3 py-2 border rounded-md text-sm"
                    />
                    <button onClick={fetchPatientAndAllergies} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md text-sm">
                        Aggiorna
                    </button>
                    <button onClick={() => { setCreating(true); setEditingId(null); setEditData({ allergen: "", reaction: "", severity: "", note: "" }); }}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md text-sm">
                        <Plus size={16} /> Nuova
                    </button>
                </div>
            </div>

            <div className="bg-white border rounded-md overflow-auto">
                <table className="min-w-full divide-y">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Allergen</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Reaction</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Severity</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Note</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-600">Azioni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">Caricamento...</td>
                            </tr>
                        ) : (
                            <>
                                {creating && (
                                    <tr>
                                        <td className="px-4 py-3 text-sm font-medium">
                                            <input value={editData.allergen} onChange={e => setEditData({ ...editData, allergen: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            <input value={editData.reaction} onChange={e => setEditData({ ...editData, reaction: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-500">
                                            <select value={editData.severity} onChange={e => setEditData({ ...editData, severity: e.target.value })} className="w-full px-2 py-1 border rounded">
                                                <option value="">Seleziona</option>
                                                <option value="LIEVE">LIEVE</option>
                                                <option value="MODERATA">MODERATA</option>
                                                <option value="GRAVE">GRAVE</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-500">
                                            <input value={editData.note} onChange={e => setEditData({ ...editData, note: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-right flex gap-2 justify-end">
                                            <button onClick={addAllergy} className="text-green-600 hover:text-green-800" title="Salva"><Save size={18} /></button>
                                            <button onClick={cancelEditing} className="text-red-600 hover:text-red-800" title="Annulla"><X size={18} /></button>
                                        </td>
                                    </tr>
                                )}

                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">Nessuna allergia trovata.</td>
                                    </tr>
                                ) : (
                                    filtered.map(u => (
                                        <tr key={u.id}>
                                            <td className="px-4 py-3 text-sm font-medium">
                                                {editingId === u.id ? (
                                                    <input value={editData.allergen} onChange={e => setEditData({ ...editData, allergen: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : u.allergen}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">
                                                {editingId === u.id ? (
                                                    <input value={editData.reaction} onChange={e => setEditData({ ...editData, reaction: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : u.reaction}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">
                                                {editingId === u.id ? (
                                                    <select value={editData.severity} onChange={e => setEditData({ ...editData, severity: e.target.value })} className="w-full px-2 py-1 border rounded">
                                                        <option value="">Seleziona</option>
                                                        <option value="LIEVE">LIEVE</option>
                                                        <option value="MODERATA">MODERATA</option>
                                                        <option value="GRAVE">GRAVE</option>
                                                    </select>
                                                ) : u.severity}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">
                                                {editingId === u.id ? (
                                                    <input value={editData.note} onChange={e => setEditData({ ...editData, note: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : u.note || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-right flex gap-2 justify-end">
                                                {editingId === u.id ? (
                                                    <>
                                                        <button onClick={() => saveAllergy(u.id)} className="text-green-600 hover:text-green-800" title="Salva"><Save size={18} /></button>
                                                        <button onClick={cancelEditing} className="text-red-600 hover:text-red-800" title="Annulla"><X size={18} /></button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => startEditing(u)} className="text-blue-600 hover:text-blue-800" title="Modifica"><Edit2 size={18} /></button>
                                                        <button onClick={() => deleteAllergy(u.id)} className="text-red-600 hover:text-red-800" title="Elimina"><Trash size={18} /></button>
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
