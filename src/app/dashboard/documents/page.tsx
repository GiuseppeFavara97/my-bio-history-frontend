import React from 'react';
import FileUploader from './components/fileuploader';
import FileSearch from './components/filesearch';

export default function FileManagerPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Il Mio File Manager</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Carica un nuovo file</h2>
        <FileUploader patientId={1} />
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Cerca i tuoi file</h2>
        <FileSearch />
      </div>
    </div>
  );
}
