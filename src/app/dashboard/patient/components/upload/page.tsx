"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {Edit2,Save,X,Upload,RefreshCw,FileText,Image as ImageIcon,Download,Trash2,Clock,AlertCircle} from "lucide-react";

import { getAllUploads, updateUpload, softDeleteUpload, saveUpload } from "@/lib/api/uploadFile";
import type { UploadFile as UploadFileType } from "@/Types/Types";

export default function UploadFilePage() {
  const [uploadFiles, setUploadFiles] = useState<UploadFileType[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [editData, setEditData] = useState<{ name: string; type: string }>({
    name: "",
    type: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ["application/pdf", "image/jpeg","image/jpg"];

  useEffect(() => {
    fetchUploadFiles();
  }, []);

  async function fetchUploadFiles() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUploads();
      setUploadFiles(data);
    } catch (err: any) {
      console.error("UPLOADS ERROR:", err?.response?.status, err?.response?.data || err);
      setError(err?.response?.data?.message ?? "Impossibile caricare i file");
      toast.error(err?.response?.data?.message ?? "Errore nel caricamento dei file");
    } finally {
      setLoading(false);
    }
  }

  async function uploadFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Formato non supportato. Carica solo PDF, JPEG o PNG.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Il file è troppo grande. Massimo 10MB.");
      return;
    }

    const name = file.name;

    const patientId = 1;

    setUploading(true);
    try {
      await saveUpload(file, patientId, name);
      toast.success("File caricato con successo!");
      await fetchUploadFiles();
    } catch (err) {
      console.error(err);
      toast.error("Errore durante il caricamento del file");
    } finally {
      setUploading(false);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
    event.target.value = "";
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await uploadFile(files[0]);
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return uploadFiles;
    return uploadFiles.filter((u) => {
      const name = u.name?.toLowerCase() || "";
      const type = u.type?.toLowerCase() || "";
      return name.includes(q) || type.includes(q);
    });
  }, [uploadFiles, search]);

  function startEditing(uploadFile: UploadFileType) {
    setEditingId(uploadFile.id);
    setEditData({
      name: uploadFile.name,
      type: uploadFile.type || "",
    });
  }

  function cancelEditing() {
    setEditingId(null);
  }

  async function saveUploadFile(id: number) {
    try {
      const updated = await updateUpload(id, editData);
      setUploadFiles((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
      toast.success("File aggiornato con successo");
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Errore durante l'aggiornamento");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Sei sicuro di voler eliminare questo file? L'azione non potrà essere annullata."))
      return;
    try {
      await softDeleteUpload(id);
      setUploadFiles((prev) => prev.filter((u) => u.id !== id));
      toast.success("File eliminato");
    } catch (err) {
      console.error(err);
      toast.error("Errore durante l'eliminazione");
    }
  }

  const getFileIcon = (type?: string) => {
    if (type?.includes("pdf")) {
      return <FileText size={24} className="text-red-500" />;
    }
    return <ImageIcon size={24} className="text-blue-500" />;
  };

  const getFileTypeLabel = (type?: string) => {
    if (type?.includes("pdf")) return "PDF";
    if (type?.includes("image")) return "Immagine";
    return "Documento";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Gestione Documenti</h1>
          <p className="text-slate-600">Carica e gestisci i tuoi documenti sanitari in modo sicuro</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`mb-8 relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            dragActive
              ? "border-blue-500 bg-blue-50 shadow-lg"
              : "border-slate-300 bg-white hover:border-blue-400"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />

          <div className="flex flex-col items-center gap-4">
            <div
              className={`p-4 rounded-full ${
                dragActive ? "bg-blue-200" : "bg-blue-100"
              } transition-colors`}
            >
              <Upload
                size={32}
                className={dragActive ? "text-blue-700" : "text-blue-600"}
              />
            </div>

            <div>
              <p className="text-xl font-semibold text-slate-900 mb-1">
                {dragActive
                  ? "Rilascia il file per caricarlo"
                  : "Trascina il documento qui"}
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <Upload size={18} />
                Seleziona file
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2">
            </p>
          </div>

          {uploading && (
            <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw size={24} className="text-blue-600 animate-spin" />
                <span className="text-sm font-medium text-slate-700">Caricamento in corso...</span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">
              {filtered.length} {filtered.length === 1 ? "documento" : "documenti"} trovati
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca documenti..."
              className="w-full sm:w-64 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            />

            <button
              onClick={fetchUploadFiles}
              disabled={loading}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Aggiorna lista"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {loading && uploadFiles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw size={32} className="text-blue-600 animate-spin" />
              <p className="text-slate-700 font-medium">Caricamento documenti...</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="flex flex-col items-center gap-2">
              <FileText size={32} className="text-slate-300" />
              <p className="text-slate-600 font-medium">
                {uploadFiles.length === 0
                  ? "Nessun documento caricato"
                  : "Nessun documento trovato"}
              </p>
              <p className="text-sm text-slate-500">
                {uploadFiles.length === 0
                  ? "Inizia caricando il tuo primo documento"
                  : "Prova con una ricerca diversa"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-lg flex-shrink-0">
                            {getFileIcon(u.type)}
                          </div>
                          <div className="min-w-0 flex-1">
                            {editingId === u.id ? (
                              <input
                                value={editData.name}
                                onChange={(e) =>
                                  setEditData({ ...editData, name: e.target.value })
                                }
                                className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none text-sm font-medium"
                              />
                            ) : (
                              <p className="font-semibold text-slate-900 text-sm truncate">
                                {u.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingId === u.id ? (
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs inline-block">
                            {getFileTypeLabel(editData.type)}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold inline-block">
                            {getFileTypeLabel(u.type)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end items-center">
                          {editingId === u.id ? (
                            <>
                              <button
                                onClick={() => saveUploadFile(u.id)}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                                title="Salva"
                              >
                                <Save size={14} />
                                Salva
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                                title="Annulla"
                              >
                                <X size={14} />
                                Annulla
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditing(u)}
                                className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-colors"
                                title="Modifica nome"
                              >
                                <Edit2 size={16} />
                              </button>
                              <a
                                href={u.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-600 hover:text-slate-700 p-2 hover:bg-slate-200 rounded transition-colors"
                                title="Scarica"
                              >
                                <Download size={16} />
                              </a>
                              <button
                                onClick={() => handleDelete(u.id)}
                                className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                                title="Elimina"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}