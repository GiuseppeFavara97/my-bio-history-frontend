"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, Save, X, Plus, Trash, Download } from "lucide-react"; 
import { UploadFile } from "@/Types/Types";

// *** API Necessarie (Ho assunto l'esistenza di getCurrentPatient e softDeleteUpload) *** // Aggiunto per ottenere l'oggetto Patient
import { createUpload, getAllUploads, updateUpload, saveUpload, softDeleteUpload } from "@/lib/api/uploadFile"; // Aggiunto softDeleteUpload (presumo esista)

export default function UploadFilePage() {
    const [UploadFile, setUploadFile] = useState<UploadFile | null>(null);
    const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]); 
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [search, setSearch] = useState("");
    
    // Nuovo stato per l'oggetto File effettivo da caricare
    const [selectedFile, setSelectedFile] = useState<File | null>(null); 

    const [editData, setEditData] = useState<Partial<UploadFile>>({
        name: "",
        type: "",
        size: 0,
        url: "",
        fileData: undefined, // Non usiamo questo campo per il file effettivo, ma lo manteniamo come placeholder
    });

    useEffect(() => {
        fetchPatientAndUploadFiles(); 
    }, []);

    async function fetchPatientAndUploadFiles() {
        setLoading(true);
        try {
            
            const filesData = await getAllUploads(); // O getUploadsByPatientId(currentPatient.id) se preferisci
            setUploadFiles(filesData); 

        } catch (error) {
            console.error(error);
            toast.error("Errore nel caricamento dei file."); 
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return uploadFiles; 
        return uploadFiles.filter(file => 
            file.name.toLowerCase().includes(q) ||
            file.type.toLowerCase().includes(q)
        );
    }, [search, uploadFiles]); 

    function startEditing(file: UploadFile) { 
        setEditingId(file.id);
        setCreating(false);
        setSelectedFile(null); // Resetta il file selezionato in modalità modifica
        setEditData({ 
            name: file.name,
            type: file.type,
            size: file.size,
            url: file.url,
            fileData: undefined,
        });
    }

    function cancelEditing() {
        setEditingId(null);
        setCreating(false);
        setSelectedFile(null); // Resetta
        setEditData({ name: "", type: "", size: 0, url: "", fileData: undefined }); 
    }

    async function saveFile(fileId: number) { 
        // Nota: Qui potresti anche aggiungere una logica per ri-caricare un file
        // se l'utente ha selezionato un nuovo file, ma per ora aggiorniamo solo i metadati.
        try {
            const updatedFile = await updateUpload(fileId, editData as UploadFile); 
            setUploadFiles(uploadFiles.map(f => f.id === fileId ? updatedFile : f)); 
            toast.success("File aggiornato con successo."); 
            cancelEditing();
        } catch (error) {
            console.error(error);
            toast.error("Errore durante l'aggiornamento.");
        }
    }

    // *** LOGICA DI UPLOAD AGGIUNTA/CORRETTA ***
    async function addFile() { 
        if (!updateUpload || !selectedFile) {
            toast.error("Errore: paziente non caricato.");
            return;
        }
        
        // Verifica se un file è stato selezionato
        if (!selectedFile) {
            toast.error("Seleziona un file da caricare.");
            return;
        }

        setLoading(true);
    try {
        // Chiamata all'API aggiornata
        const newFile = await createUpload(selectedFile); 
        
        setUploadFiles(prev => [newFile, ...prev]); 
        toast.success("File caricato con successo su Neon DB.");
        cancelEditing();
    } catch (error) {
        console.error("Errore upload:", error);
        toast.error("Errore durante il caricamento.");
    } finally {
        setLoading(false);
    }

        try {
            // Prepara i metadati per la creazione
            const uploadPayload = {
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size,
            };

            // Chiamata all'API: assumo che createUpload accetti i metadati E l'oggetto File.
            const newFile = await createUpload(uploadPayload as UploadFile); 
            
            setUploadFiles(prev => [newFile, ...prev]); 
            toast.success("File caricato con successo.");
            cancelEditing(); // Resetta lo stato, inclusi selectedFile e editData
        } catch (error) {
            console.error(error);
            toast.error("Errore durante la creazione.");
        }
    }

    async function deleteFile(fileId: number) { 
        if (!confirm("Sei sicuro di voler eliminare questo file?")) return; 
        try {
            // Uso softDeleteUpload (presumo sia stata creata)
            await softDeleteUpload(fileId); 
            setUploadFiles(prev => prev.filter(f => f.id !== fileId)); 
            toast.success("File eliminato con successo.");
        } catch (error) {
            console.error(error);
            toast.error("Errore durante l'eliminazione.");
        }
    }

    function handleDownload(url: string, name: string) {
        // La funzione downloadFile dell'API è probabilmente più complessa se gestisce l'autorizzazione
        // ma per un semplice URL pubblico, window.open è sufficiente. 
        // Se volessi usare l'API per forzare il download (e.g., downloadFile(url, name)), dovresti:
        // downloadFile(url, name); 
        window.open(url, '_blank');
    }

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold">Pannello Upload File</h2> 
                    <p className="text-sm text-slate-500">Gestisci i tuoi file caricati.</p> 
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Cerca per nome o tipo" 
                        className="w-full sm:w-80 pl-3 py-2 border rounded-md text-sm"
                    />
                    <button onClick={fetchPatientAndUploadFiles} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md text-sm">
                        Aggiorna
                    </button>
                    <button onClick={() => { 
                        setCreating(true); 
                        setEditingId(null); 
                        setSelectedFile(null); // Importante: resetta anche il file
                        setEditData({ name: "", type: "", size: 0, url: "", fileData: undefined }); 
                    }}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md text-sm">
                        <Plus size={16} /> Nuovo File
                    </button>
                </div>
            </div>

            <div className="bg-white border rounded-md overflow-auto">
                <table className="min-w-full divide-y">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Nome File</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Tipo (MIME)</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Dimensione (KB)</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">URL / File</th> 
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
                                {/* Riga di Creazione */}
                                {creating && (
                                    <tr>
                                        {/* Nome */}
                                        <td className="px-4 py-3 text-sm font-medium">
                                            {/* Nota: il nome del file sarà sovrascritto da selectedFile.name in addFile */}
                                            <input value={editData.name || ""} onChange={e => setEditData({ ...editData, name: e.target.value })} 
                                                   placeholder="Metadato Nome" className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        {/* Tipo */}
                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            <input value={editData.type || ""} onChange={e => setEditData({ ...editData, type: e.target.value })} 
                                                   placeholder="Metadato Tipo" className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        {/* Dimensione */}
                                        <td className="px-4 py-3 text-sm text-slate-500">
                                            <input type="number" value={editData.size || 0} onChange={e => setEditData({ ...editData, size: parseInt(e.target.value) })} 
                                                   placeholder="Metadato Dimensione" className="w-full px-2 py-1 border rounded" />
                                        </td>
                                        {/* URL / File Input */}
                                        <td className="px-4 py-3 text-sm text-slate-500">
                                            <input 
                                                type="file" 
                                                onChange={e => {
                                                    const file = e.target.files?.[0] || null;
                                                    setSelectedFile(file);
                                                    if (file) {
                                                        // Pre-compila alcuni metadati
                                                        setEditData(prev => ({ 
                                                            ...prev, 
                                                            name: file.name, 
                                                            type: file.type, 
                                                            size: file.size 
                                                        }));
                                                    }
                                                }} 
                                                className="w-full text-xs" 
                                            />
                                            {selectedFile && <p className="text-xs text-green-600 mt-1">{selectedFile.name} selezionato</p>}
                                        </td>
                                        {/* Azioni */}
                                        <td className="px-4 py-3 text-right flex gap-2 justify-end">
                                            <button onClick={addFile} className="text-green-600 hover:text-green-800"><Save size={18} /></button>
                                            <button onClick={cancelEditing} className="text-red-600 hover:text-red-800"><X size={18} /></button>
                                        </td>
                                    </tr>
                                )}

                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">Nessun file trovato.</td>
                                    </tr>
                                ) : (
                                    filtered.map(f => ( 
                                        <tr key={f.id}>
                                            {/* Nome File */}
                                            <td className="px-4 py-3 text-sm font-medium">
                                                {editingId === f.id ? (
                                                    <input value={editData.name || ""} onChange={e => setEditData({ ...editData, name: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : f.name}
                                            </td>
                                            {/* Tipo File */}
                                            <td className="px-4 py-3 text-sm text-slate-600">
                                                {editingId === f.id ? (
                                                    <input value={editData.type || ""} onChange={e => setEditData({ ...editData, type: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : f.type}
                                            </td>
                                            {/* Dimensione File (mostrata in KB) */}
                                            <td className="px-4 py-3 text-sm text-slate-500">
                                                {editingId === f.id ? (
                                                    <input type="number" value={editData.size || 0} onChange={e => setEditData({ ...editData, size: parseInt(e.target.value) })} className="w-full px-2 py-1 border rounded" />
                                                ) : `${(f.size / 1024).toFixed(2)} KB`}
                                            </td>
                                            {/* URL */}
                                            <td className="px-4 py-3 text-sm text-slate-500 truncate max-w-xs">
                                                {editingId === f.id ? (
                                                    <input value={editData.url || ""} onChange={e => setEditData({ ...editData, url: e.target.value })} className="w-full px-2 py-1 border rounded" />
                                                ) : <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{f.url}</a>}
                                            </td>
                                            {/* Azioni */}
                                            <td className="px-4 py-3 text-right flex gap-2 justify-end">
                                                {/* Azione Download */}
                                                <button onClick={() => handleDownload(f.url, f.name)} className="text-gray-600 hover:text-gray-800" title="Scarica"><Download size={18} /></button>
                                                {editingId === f.id ? (
                                                    <>
                                                        <button onClick={() => saveFile(f.id)} className="text-green-600 hover:text-green-800"><Save size={18} /></button> 
                                                        <button onClick={cancelEditing} className="text-red-600 hover:text-red-800"><X size={18} /></button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => startEditing(f)} className="text-blue-600 hover:text-blue-800"><Edit2 size={18} /></button> 
                                                        <button onClick={() => deleteFile(f.id)} className="text-red-600 hover:text-red-800"><Trash size={18} /></button> 
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