import React, { useState } from 'react';
import axios from 'axios';

interface UploadProfileImage {
  onClose : () => void
}

const UploadProfileImage: React.FC<UploadProfileImage> = ({onClose}) => {


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Seleziona un file prima di caricare.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Devi essere loggato per caricare una foto.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploading(true);
      setMessage(null);

      // Cambia l'URL se il tuo endpoint è differente
      const response = await axios.post('http://localhost:3001/api/auth/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Upload effettuato con successo!');
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      setMessage('Errore durante l\'upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='text-black'>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Caricamento...' : 'Carica Foto Profilo'}
      </button>
      {onClose && (
        <button className="hover:bg-amber-300 w-5 h-3"onClick={onClose}> x </button>
      )}
      <img
                src= "http://localhost:3001/uploads/390423-200.png"
                 width={40}
                height={10}
                className= "close-icon"
                
                />
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadProfileImage;
