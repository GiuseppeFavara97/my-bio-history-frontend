"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Upload } from 'lucide-react';

type DocumentPage = {
    id: number;
    name: string;
    type: string;
    size: number;
    url: string;
    createdAt: string;
};

export default function UploadDocumentPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState<DocumentPage[]>([]);

    useEffect(() => {
        // Carica la cronologia degli upload all'avvio e dopo ogni upload
        const fetchHistory = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/uploadDocuments", {
                    withCredentials: true
                });
                setHistory(response.data);
            } catch (error) {
                // Gestione errori opzionale
            }
        };
        fetchHistory();
    }, [uploading]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setMessage("");
        try {
            const data = new FormData();
            if (selectedFile) {
                data.append("file", selectedFile);
            }
            await axios.post(
                "http://localhost:3001/api/uploadDocuments/files",
                data,
                { withCredentials: true }
            );
            setMessage("Upload completato!");
            setSelectedFile(null);
        } catch (error) {
            setMessage("Errore durante l'upload.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-xl mx-auto p-8">
            <span className="text-2xl font-bold mb-6 text-center">Upload Documenti</span>
            <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <label className="flex flex-col items-center justify-center px-1 py-3 bg-blue-700 text-white rounded-lg font-semibold transition w-30 cursor-pointer">
                    <Upload className="mb-2" />
                    <span className="mb-2">{selectedFile ? selectedFile.name : "Seleziona file"}</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                    />
                </label>
               
                {message && (
                    <div className="mt-2 text-center text-lg text-blue-600">{message}</div>
                )}
            </form>

            {/* Menu cronologia upload */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-3 text-center">Cronologia Upload</h2>
                <ul className="bg-gray-100 rounded-lg p-4 max-h-64 overflow-y-auto">
                    {history.length === 0 ? (
                        <li className="text-center text-gray-500">Nessun documento caricato.</li>
                    ) : (
                        history.map(doc => (
                            <li key={doc.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                <div className="flex items-center gap-2">
                                   
                                    <span className="font-medium">{doc.name}</span>
                                    <span className="text-xs text-gray-500 ml-2">{doc.type}</span>
                                    <span className="text-xs text-gray-500 ml-2">{(doc.size/1024).toFixed(1)} KB</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">{new Date(doc.createdAt).toLocaleString()}</span>
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline text-xs"
                                    >
                                        Salva
                                    </a>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}


