"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

type Care = {
    id: number;
    name: string;
    description: string;
    durationDays: number;
    dailyFrequency: number;
}

export default function CarePage() {
    const [care, setCare] = useState<Care[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        durationDays: '',
        dailyFrequency: '',
    });
    const [search, setSearch] = useState(""); // Barra di ricerca

    useEffect(() => {
        const fetchCare = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/care', {
                    withCredentials: true
                });
                setCare(response.data);
            } catch (error) {
                console.error('Errore nel recupero delle terapie:', error);
            }
        };
        fetchCare();
    }, []);

    // Filtra le terapie in base alla barra di ricerca
    const filteredCare = care.filter(
        c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddCare = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/care/create', formData, {
                withCredentials: true
            });
            setCare([...care, response.data]);
            setShowModal(false);
            setFormData({
                name: '',
                description: '',
                durationDays: '',
                dailyFrequency: ''
            });
        } catch (error) {
            console.error('Errore nell\'aggiunta delle terapie:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Le mie Terapie</h1>
            
            <div className="flex items-center gap-4 mb-6">
                <button
                    className="px-6 py-3 bg-blue-600 text-black rounded-lg text-lg font-semibold"
                    onClick={() => setShowModal(true)}
                >
                    Aggiungi Terapia
                </button>
                <input
                    type="text"
                    className="p-3 border-2 border-blue-400 rounded-lg w-full max-w-md text-lg text-black dark:text-white"
                    placeholder="Cerca terapia, descrizione..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* MODALE */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative text-black flex flex-col items-center justify-center">
                        <button
                            className="absolute top-4 right-4 text-black-500 hover:text-black-700 text-2xl"
                            onClick={() => setShowModal(false)}
                            aria-label="Chiudi"
                        >
                            &times;
                        </button>
                        <h2 className="text-md font-bold mb-6 text-center">Aggiungi Terapia</h2>
                        <div className="w-full flex flex-col items-center justify-center">
                            <form className="grid grid-cols-2 gap-6 w-full max-w-sm" onSubmit={handleAddCare}>
                                <div className="col-span-2">
                                    <span className="font-semibold text-left">Nome *</span>
                                    <input
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                        type="text"
                                        name="name"
                                        placeholder="Nome terapia"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold text-left">Descrizione *</span>
                                    <textarea
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md h-24 resize-none"
                                        name="description"
                                        placeholder="Descrizione"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold text-left">Durata del trattamento *</span>
                                    <input
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                        type="text"
                                        name="durationDays"
                                        placeholder="Durata in giorni"
                                        value={formData.durationDays}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold text-left">Frequenza del trattamento *</span>
                                    <input
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                        type="text"
                                        name="dailyFrequency"
                                        placeholder="Frequenza giornaliera"
                                        value={formData.dailyFrequency}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button
                                    className="col-span-2 mt-2 px-8 py-3 bg-green-600 text-black rounded-lg text-lg font-semibold"
                                    type="submit"
                                >
                                    Salva
                                </button>
                                <span className="col-span-2 text-red-500 text-sm">* campi obbligatori</span>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {filteredCare.length === 0 ? (
                <p className="text-center text-gray-500">Nessuna terapia trovata.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-900 border rounded-lg shadow-lg max-w-5xl">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white"> 
                                <th className="py-4 px-8 border-b text-lg">Nome</th>
                                <th className="py-4 px-8 border-b text-lg">Descrizione</th>
                                <th className="py-4 px-8 border-b text-lg">Durata (giorni)</th>
                                <th className="py-4 px-8 border-b text-lg">Frequenza giornaliera</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCare.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white">
                                    <td className="py-3 px-8 border-b">{c.name}</td>
                                    <td className="py-3 px-8 border-b">{c.description}</td>
                                    <td className="py-3 px-8 border-b">{c.durationDays}</td>
                                    <td className="py-3 px-8 border-b">{c.dailyFrequency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}