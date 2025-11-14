"use client";
import { useSearchParams } from "next/navigation";

export default function FileViewerPage() {
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get("file");

  if (!fileUrl) return <p>File non trovato.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Visualizzazione file</h2>
      <iframe
        src={`http://localhost:3001${fileUrl}`}
        width="100%"
        height="600px"
        className="border"
      />
      <div className="mt-4">
        <a
          href={`http://localhost:3001${fileUrl}`}
          download
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Scarica il file
        </a>
      </div>
    </div>
  );
}
