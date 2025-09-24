"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

type Vaccine = {
    id: number;
    name: string;
    vaccinateDate: string;
    type: string;
    note: string;

    
}

export default function VaccinePage() {
    const [vaccines, setVaccines] = useState<Vaccine[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        vaccinateDate: '',
        type: '',
        note: '',
        
    });
    const [search, setSearch] = useState(""); // Barra di ricerca

    useEffect(() => {
        const fetchVaccines = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/vaccines', {
                    withCredentials: true
                });
                setVaccines(response.data);
            } catch (error) {
                console.error('Errore nel recupero dei vaccini:', error);
            }
        };
        fetchVaccines();
    }, []);

    
    const filteredVaccine = vaccines.filter(
            vaccine =>
            vaccine.name.toLowerCase().includes(search.toLowerCase()) ||
            vaccine.vaccinateDate.toLowerCase().includes(search.toLowerCase()) ||
            vaccine.type.toLowerCase().includes(search.toLowerCase()) ||
            vaccine.note.toLowerCase().includes(search.toLowerCase())
    );

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddVaccine = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/vaccines/create', formData, {
                withCredentials: true
            });
            setVaccines([...vaccines, response.data]);
            setShowModal(false);
            setFormData({
                name: '',
                vaccinateDate: '',
                type: '',
                note: '',
            });
        } catch (error) {
            console.error('Errore nell\'aggiunta dell\'vaccini:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">I miei vaccini</h1>
            <div className="flex items-center gap-4 mb-6">
            <button
                className="cursor-pointer px-6 py-3 bg-blue-600 text-black rounded-lg text-short font-semibold"
                onClick={() => setShowModal(true)}
            >
                Aggiungi Vaccini
            </button>
            <input
                    className="p-3 border-2 border-blue-400 rounded-lg w-full max-w-md text-lg"
                    type="text"
                    placeholder="Cerca nome, tipo e data"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                />
            </div>

            {/* MODALE */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative text-black">
                        <button
                            className="absolute top-4 right-4 text-black-500 hover:text-black-700 text-2xl"
                            onClick={() => setShowModal(false)}
                            aria-label="Chiudi"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-6 text-center">Aggiungi Vaccini</h2>
                        <form className="grid grid-cols-2 gap-6" onSubmit={handleAddVaccine}>
                            <div className="col-span-2 w-90">
                                <p className="mb-1 font-bold">Nome *</p>
                                <input
                                    className="mb-2 p-1.4 box-border border-slate-400 border-4 p-4-lg w-full text-sm"
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-span-2 w-90">
                                <span className="mb-1 font-semibold">Data del vaccino *</span>
                                <input
                                    className="mb-2 p-1.4 box-border border-slate-400 border-4 p-4-lg w-full text-sm"
                                    type="text"
                                    name="vaccinateDate"
                                    placeholder="Data del vaccino"
                                    value={formData.vaccinateDate}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                            className=" -mx-9 w-5"
                            type="date"
                            onChange={e => setFormData({ ...formData, vaccinateDate: e.target.value })}
                            value={formData.vaccinateDate}
                            aria-label="Seleziona data"
                            />
                            </div>

                            <div className='col-span-2 w-90'>
                                <p className="mb-1 font-semibold"> tipo del vaccino *</p>
                                <input
                                className="mb-2 p-1.4 box-border border-slate-400 border-4 p-4-lg w-full text-sm"
                                type="text"
                                name="type"
                                placeholder='Tipo del vaccino'
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                            />
                            </div>


                                 <div className="col-span-2 w-90"> 
                                  <p className="mb-1 font-semibold">Note </p>
                                  <textarea
                                className="mb-2 p-1.4 box-border border-slate-400 border-4 p-4-lg w-full h-24 text-sm"
                                name="note"
                                placeholder="Note"
                                value={formData.note}
                                onChange={handleInputChange}
                            />
                            </div>
                            
                            <button
                                className="col-span-2 mt-2 px-8 py-3 bg-green-600 text-black rounded-lg text-lg font-semibold"
                                type="submit"
                            >
                                Salva
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {filteredVaccine.length === 0 ? (
                <p className="text-center text-gray-500">Nessun vaccino trovato.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-w-5xl">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-black"> 
                                <th className="py-4 px-8 border-b text-lg">Nome</th>
                                <th className="py-4 px-8 border-b text-lg">Data del vaccino</th>
                                <th className="py-4 px-8 border-b text-lg">Tipo</th>
                                <th className="py-4 px-8 border-b text-lg">Note</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVaccine.map((vaccine) => (
                                <tr key={vaccine.id} className="hover:bg-gray-200 dark:hover:bg-gray-700 text-black">
                                    <td className="py-3 px-8 border-b">{vaccine.name}</td>
                                    <td className="py-3 px-8 border-b">{vaccine.vaccinateDate}</td>
                                    <td className="py-3 px-8 border-b">{vaccine.type}</td>
                                    <td className="py-3 px-8 border-b">{vaccine.note}</td>
                                    {/* Puoi aggiungere qui Data Inizio e Data Fine se servono */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}