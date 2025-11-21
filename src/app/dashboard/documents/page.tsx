"use client";
import Sidebar from "../patient/components/sidebar"; // Adatta il path secondo la tua struttura
import FileUploader from "./components/fileuploader";
import FileSearch from "./components/filesearch";

export default function DocumentsPage() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar laterale */}
      <Sidebar />

      {/* Contenuto principale, font più leggibile e compatto */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-lg font-semibold mb-2 text-white text-center">Il Mio File Manager</h1>

          <section className="bg-gray-800 shadow rounded-lg p-4 outline outline-lime-400/60">
            <h2 className="text-base font-medium mb-2 text-white">Carica un nuovo file</h2>
            <FileUploader patientId={1} />
          </section>

          <section className="bg-gray-800 shadow rounded-lg p-4 outline outline-lime-400/60">
            <h2 className="text-base font-medium mb-2 text-white">Cerca i tuoi file</h2>
            <FileSearch />
          </section>
        </div>
      </main>
    </div>
  );
}
