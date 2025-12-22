"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, Save, X } from "lucide-react";
import { getUsers } from "@/lib/api/users";
import { User, UserRole } from "../../../Types/Types";
import { updateUser } from "@/lib/api/users";

export default function AdminDashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | undefined>(undefined);
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [editData, setEditData] = useState<{
        username: string;
        email: string;
        role: UserRole;
    }>({
        username: "",
        email: "",
        role: UserRole.PATIENT,
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        setError(undefined);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setError("Impossibile caricare gli utenti");
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return users;
        return users.filter((u) => {
            const username = u.username.toLowerCase();
            const email = u.email.toLowerCase();
            return username.includes(q) || email.includes(q);
        });
    }, [users, search]);

    function startEditing(user: User) {
        setEditingId(user.id);
        setEditData({
            username: user.username,
            email: user.email,
            role: user.role,
        });
    }

    function cancelEditing() {
        setEditingId(undefined);
    }

    async function saveUser(id: number) {
        try {
            const updatedUser = await updateUser(id, editData);

            setUsers(prev =>
                prev.map(u => (u.id === id ? { ...u, ...updatedUser } : u))
            );

            toast.success("Utente aggiornato");
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
                    <button onClick={fetchUsers} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md text-sm">
                        Aggiorna
                    </button>
                </div>
            </div>

            <div className="bg-white border rounded-md overflow-auto">
                <table className="min-w-full divide-y">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Username</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Ruolo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Creato</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Modificato</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Eliminato</th>
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
                                    <td className="px-4 py-3 text-sm font-medium">{u.username}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600 break-all">{u.email}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600 break-all">{u.role}</td>
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