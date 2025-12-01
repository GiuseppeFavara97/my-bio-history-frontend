"use client";
import React, { useState } from "react";

interface FileUploaderProps {
  patientId: number;
}

export default function FileUploader({ patientId }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus("");
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Seleziona un file prima di caricarlo.");
      return;
    }
    setLoading(true);
    setUploadStatus("Caricamento in corso...");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("patientId", patientId.toString());

    try {
      const response = await fetch("http://localhost:3001/api/uploadDocuments/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus("File caricato con successo!");
        setSelectedFile(null);
        console.log("Documento caricato:", data);
      } else {
        const errorData = await response.json();
        setUploadStatus(`Errore nel caricamento: ${errorData.message || response.statusText}`);
      }
    } catch (error: any) {
      setUploadStatus(`Errore di rete: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
        className="block w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {selectedFile && (
        <p className="text-xs text-gray-600">File selezionato: {selectedFile.name}</p>
      )}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none text-xs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Caricamento..." : "Carica File"}
      </button>
      {uploadStatus && (
        <p className={`text-xs ${uploadStatus.includes("successo") ? "text-green-600" : "text-red-600"}`}>{uploadStatus}</p>
      )}
    </div>
  );
}
