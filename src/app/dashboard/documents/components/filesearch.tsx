"use client";
import React, { useState } from "react";

interface FileEntry {
  id: number;
  name: string;
  originalName: string;
  type: string;
  size: number;
  url: string;
  createdAt: string;
}

export default function FileSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [viewMode, setViewMode] = useState<"search" | "latest" | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setViewMode("search");

    if (!searchTerm.trim()) {
      setSearchResults([]);
      setMessage("Inserisci un nome per la ricerca.");
      return;
    }

    setLoading(true);
    setMessage("Ricerca in corso...");
    setSearchResults([]);

    try {
      const response = await fetch(
        `http://localhost:3001/api/uploadDocuments/search?name=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data: FileEntry[] = await response.json();
        setSearchResults(data);
        setMessage(data.length === 0 ? "Nessun file trovato con questo nome." : `Trovati ${data.length} file.`);
      } else {
        const errorData = await response.json();
        setMessage(`Errore nella ricerca: ${errorData.message || response.statusText}`);
      }
    } catch (error: any) {
      setMessage(`Errore di rete: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLatest = async () => {
    setViewMode("latest");
    setLoading(true);
    setMessage("Caricamento ultimi file...");
    setSearchResults([]);

    try {
      const response = await fetch("http://localhost:3001/api/uploadDocuments/latest?limit=5", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: FileEntry[] = await response.json();
        setSearchResults(data);
        setMessage(`Ultimi ${data.length} file caricati.`);
      } else {
        const errorData = await response.json();
        setMessage(`Errore: ${errorData.message || response.statusText}`);
      }
    } catch (error: any) {
      setMessage(`Errore di rete: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const refreshList = async () => {
    if (viewMode === "search") {
      await handleSearch({ preventDefault: () => {} } as React.FormEvent);
    } else if (viewMode === "latest") {
      await handleLatest();
    }
  };

  const handleDownload = (file: FileEntry) => {
    const link = document.createElement("a");
    link.href = `http://localhost:3001${file.url}`;
    link.download = file.originalName || file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: number) => {
    const conferma = window.confirm("Sei sicuro di voler eliminare il documento?");
    if (!conferma) return;

    try {
      const response = await fetch(`http://localhost:3001/api/uploadDocuments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage("File eliminato con successo.");
        await refreshList();
      } else {
        const errorData = await response.json();
        setMessage(`Errore: ${errorData.message || response.statusText}`);
      }
    } catch (error: any) {
      setMessage(`Errore di rete: ${error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-3 border rounded-md shadow-sm bg-gray-50 space-y-2">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Cerca file per nome..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow p-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none text-xs disabled:opacity-50"
        >
          {loading ? "Ricerca..." : "Cerca"}
        </button>
        <button
          type="button"
          onClick={handleLatest}
          disabled={loading}
          className="px-2 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none text-xs disabled:opacity-50"
        >
          {loading ? "Caricamento..." : "Files recenti"}
        </button>
      </form>

      {viewMode && (
        <p className="text-xs text-gray-500 italic">
          Vista attiva: {viewMode === "search" ? "Risultati della ricerca" : "Ultimi file caricati"}
        </p>
      )}

      {message && (
        <p className={`text-xs ${searchResults.length > 0 ? "text-green-600" : "text-gray-600"}`}>{message}</p>
      )}

      {searchResults.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">Nome File</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">Dimensione</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">Caricato il</th>
                <th className="relative px-4 py-2"><span className="sr-only">Azioni</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchResults.map((file) => (
                <tr key={file.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-blue-600 hover:underline">
                    <a
                      href={`http://localhost:3001${file.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.originalName || file.name}
                    </a>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-500">{file.type}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-500">
                    {new Date(file.createdAt).toLocaleDateString("it-IT")}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right font-medium space-x-2">
                    <button
                      onClick={() => handleDownload(file)}
                      className="text-indigo-600 hover:text-indigo-900 text-xs"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
