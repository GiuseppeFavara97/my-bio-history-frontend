"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, Save, X } from "lucide-react";
import { getUsers } from "@/lib/api/users";
import { User } from "../../../lib/types";
import { UploadFile } from "../../../../../Types/Types";

export default function UploadFilePage() {
    const [users, setUsers] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number>(null);
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [editData, setEditData] = useState<{
        name: string;
        type: string;
        size: string;
        url: string;
    }>({
        name: "",
        type: "",
        size: "",
        url: "",
    });

    useEffect(() => {
        fetchUploadFiles();
    }, []);

    async function fetchUploadFiles() {
        setLoading(true);
        setError(null);
        try {
            const data = await getUploadFiles();
            setUploadFiles(data);
        } catch (err) {
            console.error(err);
            setError("Impossibile caricare gli utenti");
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return uploadFiles;
        return uploadFiles.filter((u) => {
            const name = u.name.toLowerCase();
            const type = u.type.toLowerCase();
            const size = u.type.toLowerCase();
            const url = u.url.toLowerCase();
        });
    }, [users, search]);

    function startEditing(UploadFile: UploadFile) {
        setEditingId(UploadFile.id);
        setEditData({
            name: uploadFile.name,
            type: uploadFile.type,
            size: uploadFile.size,
            url: UploadFile.url
        });
    }

    function cancelEditing() {
        setEditingId(null);
    }

    async function saveUploadFile(id: number) {
        try {
            const updatedUploadFile = await updateUploadFile(id, editData);

            setUsers(prev =>
                prev.map(u => (u.id === id ? { ...u, ...updatedUploadFile } : u))
            );

            toast.success("Utente aggiornato");
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
                    <h2 className="text-2xl font-semibold">Pannello Admin</h2>
                    <p className="text-sm text-slate-500">Gestisci gli utenti del sistema.</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cerca per nome o email..."
                        className="w-full sm:w-80 pl-3 py-2 border rounded-md text-sm"
                    />
                    <button onClick={fetchUploadFiles} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md text-sm">
                        Aggiorna
                    </button>
                </div>
            </div>

            <div className="bg-white border rounded-md overflow-auto">
                <table className="min-w-full divide-y">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Nome</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Tipo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Dimensione</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Url</th>
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
                                    Nessun utente trovato.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((u) => (
                                <tr key={u.id}>
                                    <td className="px-4 py-3 text-sm font-medium">{u.name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600 break-all">{u.type}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600 break-all">{u.size}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600 break-all">{u.url}</td>
                                    <td className="px-4 py-3 text-sm text-slate-500">
                
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