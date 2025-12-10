"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, Save, X } from "lucide-react";
import { allergy} from "../../../lib/api";

export default function AllergyPage() {
    const [allergies, setAllergies] = useState<Allergy[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number>(null);
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [editData, setEditData] = useState<{
        allergen: string;
        reaction: string;
        severity: string;
        note: string;
    }>({
        allergen: "",
        reaction: "",
        severity: "",
        note:""
    });

    useEffect(() => {
        fetchAllergies();
    }, []);

    async function fetchAllergies() {
        setLoading(true);
        setError(null);
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
            
        });
    }

    function cancelEditing() {
        setEditingId(null);
    }

    async function saveAllergy(id: number) {
        try {
            const updatedAllergy = await updateAllergy(id, editData);

            setAllergies(prev =>
                prev.map(u => (u.id === id ? { ...u, ...updatedAllergy } : u))
            );

            toast.success("Allergia aggiornata");
            setEditingId(null);
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
                                    <td className="px-4 py-3 text-sm font-medium">{u.allergen}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600 break-all">{u.reaction}</td>
                                    <td className="px-4 py-3 text-sm text-slate-500">
                                        {new Date(u.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-500">
                                        {new Date(u.updatedAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {u.softDeleted ? (
                                            <span className="text-red-600 font-medium">Sì</span>
                                        ) : (
                                            <span className="text-green-600 font-medium">No</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => startEditing(u)} className="text-blue-600 hover:text-blue-800">
                                            <Edit2 size={18} />
                                        </button>
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