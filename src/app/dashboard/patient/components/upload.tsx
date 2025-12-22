"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, Save, X } from "lucide-react";
import { getAllergies, updateAllergy, softDeleteAllergy } from "@/lib/api/allergy";
import { Allergy } from "@/Types/Types";

export default function AllergyPage() {
    const [allergies, setAllergies] = useState<Allergy[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | undefined>(undefined);
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [editData, setEditData] = useState<{
        allergen: string;
        reaction: string;
        severity: string;
        note: string;
    }>({
        allergen: "",
        reaction: "",
        severity: "",
        note: ""
    });

    useEffect(() => {
        fetchAllergies();
    }, []);

    async function fetchAllergies() {
        setLoading(true);
        setError(undefined);
        try {
            const data = await getAllergies();
            setAllergies(data);
        } catch (err) {
            console.error(err);
            setError("Impossibile caricare le allergie");
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return allergies;
        return allergies.filter((u) => {
            const allergen = u.allergen.toLowerCase();
            const reaction = u.reaction.toLowerCase();
            return allergen.includes(q) || reaction.includes(q);
        });
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
        setEditingId(undefined);
    }

    async function saveAllergy(id: number) {
        try {
            const updatedAllergy = await updateAllergy(id, editData);

            setAllergies(prev =>
                prev.map(u => (u.id === id ? { ...u, ...updatedAllergy } : u))
            );

            toast.success("Allergia aggiornata");
            setEditingId(undefined);
        } catch (err) {
            console.error(err);
            toast.error("Errore di rete");
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
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cerca per allergene e reazione"
                        className="w-full sm:w-80 pl-3 py-2 border rounded-md text-sm"
                    />
                    <button onClick={fetchAllergies} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md text-sm">
                        Aggiorna
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
                                <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                                    Caricamento...
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                                    Nessuna allergia trovata.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((u) => (
                                <tr key={u.id}>
                                    <td className="px-4 py-3 text-sm font-medium">
                                        {editingId === u.id ? (
                                            <input
                                                value={editData.allergen}
                                                onChange={(e) => setEditData({ ...editData, allergen: e.target.value })}
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        ) : (
                                            u.allergen
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-600">
                                        {editingId === u.id ? (
                                            <input
                                                value={editData.reaction}
                                                onChange={(e) => setEditData({ ...editData, reaction: e.target.value })}
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        ) : (
                                            u.reaction
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-500">
                                        {editingId === u.id ? (
                                            <select
                                                value={editData.severity}
                                                onChange={(e) => setEditData({ ...editData, severity: e.target.value })}
                                                className="w-full px-2 py-1 border rounded"
                                            >
                                                <option value="">Seleziona</option>
                                                <option value="LIEVE">LIEVE</option>
                                                <option value="MODERATA">MODERATA</option>
                                                <option value="GRAVE">GRAVE</option>
                                            </select>
                                        ) : (
                                            u.severity
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-500">
                                        {editingId === u.id ? (
                                            <input
                                                value={editData.note}
                                                onChange={(e) => setEditData({ ...editData, note: e.target.value })}
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        ) : (
                                            u.note || "-"
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right flex gap-2 justify-end">
                                        {editingId === u.id ? (
                                            <>
                                                <button
                                                    onClick={() => saveAllergy(u.id)}
                                                    className="text-green-600 hover:text-green-800"
                                                    title="Salva"
                                                >
                                                    <Save size={18} />
                                                </button>
                                                <button
                                                    onClick={cancelEditing}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Annulla"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => startEditing(u)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Modifica"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}