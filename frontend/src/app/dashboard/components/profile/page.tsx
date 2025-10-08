'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './profile.css';
import UploadProfileImage from '@/components/upload';
import Button from '@/components/navigation/navbar/button';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  birthdayPlace: string;
  province: string;
  sex: string;
  phoneNumber: number;
  profileImageUrl?: string;
  taxCode: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [show , setShow] = useState(false)
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<UserProfile | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const backendURL = `${API_URL}/api/auth/Profile`;

  function upload() {
    return (
      <div>
        viso
      </div>
    )
  }

  useEffect(() => {
    axios
      .get<UserProfile>(backendURL, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => {
        console.error(err);
        setError('Sessione scaduta o accesso non autorizzato.');
        router.push('/login');
      });
  }, [router]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Caricamento profilo...</p>;

  return (
    <div className="profile-wrapper">
      <h1 className="profile-title">Profilo Utente</h1>
      <div className="profile-form outline">
        {/* Sezione sinistra: immagine profilo + upload */}
        <div className="outline h-full profile-left">
          <img
            src={user.profileImageUrl ? `${API_URL}${user.profileImageUrl}` : '/omino blu.webp'}
            alt={"Avatar Utente"}
            onClick={() => setShow(true)}
            className="profile-avatar"
          />
          <div className='items-center outline flex-col w-full text-center h-full'>
          <div className="flex flex-col profile-actions">
            <div className='items-center flex-col'>
              <Button
                className="cursor-pointer hover:bg-blue-500 w-full"
                onClick={() => {
                  setEditData(user);
                  setEditModal(true);
                }}
              >
                Modifica Profilo
              </Button>
            </div>
            <Button className="cursor-pointer hover:bg-red-500" onClick={() => alert('Cambia password non ancora disponibile')}  >Cambia Password</Button>
            <Button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className="btn-logout"
            >
              Logout
            </Button>
          </div>
        </div>
        </div>
          {show && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <UploadProfileImage onClose={() => setShow(false)} />
              </div>
            </div>
)}
      {/* MODALE MODIFICA PROFILO */}
      {editModal && editData && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Modifica Profilo</h2>
            <form
              className="flex flex-col gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(`${API_URL}/api/auth/update-profile`, editData, { withCredentials: true });
                  setUser(editData);
                  setEditModal(false);
                } catch (err) {
                  alert("Errore durante la modifica del profilo.");
                }
              }}
            >
              <input
                className="p-2 border rounded"
                type="text"
                value={editData.firstName}
                onChange={e => setEditData({ ...editData, firstName: e.target.value })}
                placeholder="Nome"
                required
              />
              <input
                className="p-2 border rounded"
                type="text"
                value={editData.lastName}
                onChange={e => setEditData({ ...editData, lastName: e.target.value })}
                placeholder="Cognome"
                required
              />
              <input
                className="p-2 border rounded"
                type="email"
                value={editData.email}
                onChange={e => setEditData({ ...editData, email: e.target.value })}
                placeholder="Email"
                required
              />
              <input
                className="p-2 border rounded"
                type="text"
                value={editData.phoneNumber}
                onChange={e => setEditData({ ...editData, phoneNumber: Number(e.target.value) })}
                placeholder="Telefono"
              />
              <input
                className="p-2 border rounded"
                type="text"
                value={editData.province}
                onChange={e => setEditData({ ...editData, province: e.target.value })}
                placeholder="Provincia"
              />
              <input
                className="p-2 border rounded"
                type="text"
                value={editData.birthdayPlace}
                onChange={e => setEditData({ ...editData, birthdayPlace: e.target.value })}
                placeholder="Luogo di nascita"
              />
              <input
                className="p-2 border rounded"
                type="date"
                value={new Date(editData.birthday).toISOString().split('T')[0]}
                onChange={e => setEditData({ ...editData, birthday: new Date(e.target.value) })}
                placeholder="Data di nascita"
              />
              <input
                className="p-2 border rounded"
                type="text"
                value={editData.sex}
                onChange={e => setEditData({ ...editData, sex: e.target.value })}
                placeholder="Sesso"
              />
              <input
                className="p-2 border rounded"
                type="text"
                value={editData.taxCode}
                onChange={e => setEditData({ ...editData, taxCode: e.target.value })}
                placeholder="Codice Fiscale"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded font-semibold"
                >
                  Salva
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded font-semibold"
                  onClick={() => setEditModal(false)}
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Sezione destra: campi utente */}
      <div className="profile-right">
        <div className="profile-fields">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" value={user.firstName} readOnly />
            </div>
            <div className="form-group">
              <label>Cognome</label>
              <input type="text" value={user.lastName} readOnly />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={user.username} readOnly />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={user.email} readOnly />
            </div>
            <div className="form-group">
              <label>Telefono</label>
              <input type="text" value={user.phoneNumber} readOnly />
            </div>
            <div className="form-group">
              <label>Provincia</label>
              <input type="text" value={user.province} readOnly />
            </div>
            <div className="form-group">
              <label>Luogo di nascita</label>
              <input type="text" value={user.birthdayPlace} readOnly />
            </div>
            <div className="form-group">
              <label>Data di nascita</label>
              <input
                type="text"
                value={new Date(user.birthday).toLocaleDateString('it-IT')}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Sesso</label>
              <input type="text" value={user.sex} readOnly />
            </div>
            <div className="form-group">
            <label>CodiceFiscale</label>
            <input type= "text" value={user.taxCode} readOnly />
            </div>
          </div>
        </div>
      </div>

      {/* Pulsanti azione */}
      
    </div>
  );
};

export default Profile;
