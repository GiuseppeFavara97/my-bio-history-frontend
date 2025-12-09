"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, Save, X } from "lucide-react";

type User = {
    id: string;
    name: string | null;
    email: string;
    role: string | null;
    createdAt: string;
};

export default function AdminDashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<{ name: string; email: string; role: string }>({ name: "", email: "", role: "user" });
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/users");
            if (!res.ok) throw new Error("Caricamento utenti fallito");
            const data = (await res.json()) as User[];
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
            const name = (u.name ?? "").toLowerCase();
            const email = (u.email ?? "").toLowerCase();
            return name.includes(q) || email.includes(q);
        });
    }, [users, search]);

    function startEditing(user: User) {
        setEditingId(user.id);
        setEditData({
            name: user.name ?? "",
            email: user.email,
            role: user.role ?? "user",
        });
    }

    function cancelEditing() {
        setEditingId(null);
    }

    async function saveUser(id: string) {
        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...editData }),
            });
            const data = await res.json().catch(() => null);
            if (!res.ok) {
                toast.error((data as any)?.message || "Aggiornamento fallito");
                return;
            }
            setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...editData } : u)));
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
                    <button onClick={fetchUsers} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md text-sm">
                        Aggiorna
                    </button>
                </div>
            </div>

            <div className="bg-white border rounded-md overflow-auto">
                <table className="min-w-full divide-y">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Nome</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Ruolo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Creato</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-600">Azioni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                                    Caricamento...
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                                    Nessun utente trovato.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((u) => (
                                <tr key={u.id}>
                                    <td className="px-4 py-3">
                                        {editingId === u.id ? (
                                            <input
                                                value={editData.name}
                                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                className="border rounded px-2 py-1 text-sm w-full"
                                            />
                                        ) : (
                                            <div className="text-sm font-medium">{u.name ?? "—"}</div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {editingId === u.id ? (
                                            <input
                                                value={editData.email}
                                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                                className="border rounded px-2 py-1 text-sm w-full"
                                            />
                                        ) : (
                                            <div className="text-sm text-slate-600 break-all">{u.email}</div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {editingId === u.id ? (
                                            <select
                                                value={editData.role}
                                                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                                                className="px-2 py-1 border rounded-md text-sm"
                                            >
                                                <option value="business">Business</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        ) : (
                                            <div className="text-sm">{u.role ?? "user"}</div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-500">
                                        {new Date(u.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right flex justify-end gap-2">
                                        {editingId === u.id ? (
                                            <>
                                                <button onClick={() => saveUser(u.id)} className="text-green-600 hover:text-green-800">
                                                    <Save size={18} />
                                                </button>
                                                <button onClick={cancelEditing} className="text-red-600 hover:text-red-800">
                                                    <X size={18} />
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => startEditing(u)} className="text-blue-600 hover:text-blue-800">
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