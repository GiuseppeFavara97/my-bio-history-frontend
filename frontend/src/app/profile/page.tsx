'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UploadProfileImage from '../../components/upload';
import Button from '../../components/navigation/navbar/button';

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
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const backendURL = `${API_URL}/api/auth/Profile`;

  useEffect(() => {
    axios
      .get<UserProfile>(backendURL, {
        withCredentials: true,
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
        setError('Sessione scaduta o accesso non autorizzato.');
        router.push('/login');
      });
  }, [router]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Caricamento profilo...</p>;

  return (
    <div>
      {user.profileImageUrl && (
        <img
          src={`${API_URL}${user.profileImageUrl}`}
          alt="Foto Profilo"
          style={{ width: '150px', borderRadius: '50%' }}
        />
      )}
      <UploadProfileImage />
      <h2>Profilo Utente</h2>
      <p><strong>Nome:</strong> {user.firstName}</p>
      <p><strong>Cognome:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Telefono:</strong> {user.phoneNumber}</p>
      <p><strong>Provincia:</strong> {user.province}</p>
      <p><strong>Luogo di nascita:</strong> {user.birthdayPlace}</p>
      <p><strong>Data di nascita:</strong> {new Date(user.birthday).toLocaleDateString()}</p>

      <Button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;
