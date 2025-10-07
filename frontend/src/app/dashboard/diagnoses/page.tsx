"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

type Diagnoses = {
    id: number;
    pathologyName: string;
    description: string;
    createdAt: string;
    updateAt: string;
    
}

export default function DiagnosesPage() {
    const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        pathologyName: '',
        description: '',
        createdAt: '',
        updateAt: '',
       
    });
    const [search, setSearch] = useState(""); // Barra di ricerca

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/diagnoses', {
                    withCredentials: true
                });
                
            } catch (error) {
                console.error('Errore nel recupero delle diagnosi:', error);
            }
        };
        fetchDiagnoses();
    }, []);

    // Filtra le allergie in base alla barra di ricerca
    const filteredDiagnoses = diagnoses.filter(
        diagnoses =>
            diagnoses.pathologyName.toLowerCase().includes(search.toLowerCase()) ||
            diagnoses.description.toLowerCase().includes(search.toLowerCase()) ||
            diagnoses.createdAt.toLowerCase().includes(search.toLowerCase()) ||
            diagnoses.updateAt.toLowerCase().includes(search.toLowerCase())
    );

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddDiagnoses = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/diagnoses/create', formData, {
                withCredentials: true
            });
            setDiagnoses([...diagnoses, response.data]);
            setShowModal(false);
            setFormData({
                pathologyName: '',
                description: '',
                createdAt: '',
                updateAt: ''
               
            });
        } catch (error) {
            console.error('Errore nell\'aggiunta della dagnosi:', error);
        }
    };

    return (
        <div className="p-4 flex-1 flex flex-col ">
            <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Le mie Diagnosi</h1>
            
            <div className="flex items-center gap-4 mb-6">
                <button
                    className="px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold"
                    onClick={() => setShowModal(true)}
                >
                    Aggiungi Diagnosi
                </button>
                <input
                    type="text"
                    className="p-3 border-2 border-blue-400 rounded-lg w-full max-w-md text-lg text-black dark:text-white"
                    placeholder="Cerca diagnosi, descrizione..."
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
                        <h2 className="text-md font-bold mb-6 text-center">Aggiungi Diagnosi</h2>
                        <div className="w-full flex flex-col items-center justify-center">
                            <form className="grid grid-cols-2 gap-6 w-full max-w-sm" onSubmit={handleAddDiagnoses}>
                                <div className="col-span-2">
                                    <span className="font-bold text-left">Nome patologia *</span>
                                    <input
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                        type="text"
                                        name="pathologyName"
                                        placeholder="Nome patologia"
                                        value={formData.pathologyName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold text-left">Descrizione</span>
                                    <textarea
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md h-24 resize-none"
                                        name="description"
                                        placeholder="Descrizione"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        
                                    />
                                </div>
                                
                                <div className="col-span-2">
                                    <p className="font-semibold text-left">Data di aggiunta *</p>
                                    <div className="flex gap-4">
                                        <input
                                            className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                            type="text"
                                            name="createdAt"
                                            placeholder="Data di aggiunta"
                                            value={formData.createdAt}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            className="-mx-13 w-5"
                                            type="date"
                                            onChange={e => setFormData({ ...formData,createdAt: e.target.value })}
                                            value={formData.createdAt}
                                            aria-label="Seleziona data"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <p className="font-semibold text-left">Data di modifica</p>
                                    <div className="flex gap-4">
                                        <input
                                            className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                            type="text"
                                            name="updateAt"
                                            placeholder="Data di modifica"
                                            value={formData.updateAt}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="-mx-13 w-5"
                                            type="date"
                                            onChange={e => setFormData({ ...formData, updateAt: e.target.value })}
                                            value={formData.updateAt}
                                            aria-label="Seleziona data"
                                        />
                                    </div>
                                </div>
                                <span className="col-span-2 text-red-500 text-sm">* campi obbligatori</span>
                                <button
                                    className="col-span-2 mt-2 px-8 py-3 bg-green-600 text-black rounded-lg text-lg font-semibold"
                                    type="submit"
                                >
                                    Salva
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {filteredDiagnoses.length === 0 ? (
                <p className="text-center text-gray-500">Nessuna diagnosi trovata.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-900  border rounded-lg shadow-lg max-w-5xl">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white"> 
                                <th className="py-4 px-8 border-b text-lg">Nome patologia</th>
                                <th className="py-4 px-8 border-b text-lg">Descrizione</th>
                                <th className="py-4 px-8 border-b text-lg">Data di aggiunta</th>
                                <th className="py-4 px-8 border-b text-lg">Data di modifica</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDiagnoses.map((diagnoses) => (
                                <tr key={diagnoses.id} className="hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white">
                                    <td className="py-3 px-8 border-b">{diagnoses.pathologyName}</td>
                                    <td className="py-3 px-8 border-b">{diagnoses.description}</td>
                                    <td className="py-3 px-8 border-b">{diagnoses.createdAt}</td>
                                    <td className="py-3 px-8 border-b">{diagnoses.updateAt}</td>
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