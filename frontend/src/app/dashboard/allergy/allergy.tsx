"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

type Allergy = {
    id: number;
    allergen: string;
    reaction: string;
    severity: string;
    note: string;
    
}

export default function AllergyPage() {
    const [allergies, setAllergies] = useState<Allergy[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        allergen: '',
        reaction: '',
        severity: '',
        note: '',
        startDate: '',
        endDate: '',
    });
    const [search, setSearch] = useState(""); // Barra di ricerca

    useEffect(() => {
        const fetchAllergies = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/allergies', {
                    withCredentials: true
                });
                setAllergies(response.data);
            } catch (error) {
                console.error('Errore nel recupero delle allergie:', error);
            }
        };
        fetchAllergies();
    }, []);

    // Filtra le allergie in base alla barra di ricerca
    const filteredAllergies = allergies.filter(
        allergy =>
            allergy.allergen.toLowerCase().includes(search.toLowerCase()) ||
            allergy.reaction.toLowerCase().includes(search.toLowerCase()) ||
            allergy.severity.toLowerCase().includes(search.toLowerCase()) ||
            allergy.note.toLowerCase().includes(search.toLowerCase())
    );

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddAllergy = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/allergies/create', formData, {
                withCredentials: true
            });
            setAllergies([...allergies, response.data]);
            setShowModal(false);
            setFormData({
                allergen: '',
                reaction: '',
                severity: '',
                note: '',
                startDate: '',
                endDate: '',
            });
        } catch (error) {
            console.error('Errore nell\'aggiunta dell\'allergia:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Le mie Allergie</h1>
            
            <div className="flex items-center gap-4 mb-6">
                <button
                    className="cursor-pointer px-6 py-3 bg-blue-600 text-black rounded-lg text-lg font-semibold"
                    onClick={() => setShowModal(true)}
                >
                    Aggiungi Allergia
                </button>
                <input
                    type="text"
                    className="p-3 border-2 border-blue-400 rounded-lg w-full max-w-md text-lg"
                    placeholder="Cerca allergia, reazione, gravità o note..."
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
                        <h2 className="text-md font-bold mb-6 text-center">Aggiungi Allergia</h2>
                        <div className="w-full flex flex-col items-center justify-center">
                            <form className="grid grid-cols-2 gap-6 w-full max-w-sm" onSubmit={handleAddAllergy}>
                                <div className="col-span-2">
                                    <p className="font-bold text-left">Allergene *</p>
                                    <input
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                        type="text"
                                        name="allergen"
                                        placeholder="Allergene"
                                        value={formData.allergen}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <p className="font-semibold text-left">Reazione *</p>
                                    <input
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                        type="text"
                                        name="reaction"
                                        placeholder="Reazione"
                                        value={formData.reaction}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <p className="font-semibold text-let">Gravità *</p>
                                    <select
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                        name="severity"
                                        value={formData.severity}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>Seleziona gravità</option>
                                        <option value="Lieve">Lieve</option>
                                        <option value="Moderata">Moderata</option>
                                        <option value="Grave">Grave</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold text-left">Note</span>
                                    <textarea
                                        className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-lg h-24 resize-none"
                                        name="note"
                                        placeholder="Note"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        
                                    />
                                </div>
                                <div className="col-span-2">
                                    <p className="font-semibold text-left">Data di inizio *</p>
                                    <div className="flex gap-4">
                                        <input
                                            className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                            type="text"
                                            name="startDate"
                                            placeholder="Data Inizio"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            className="-mx-13 w-5"
                                            type="date"
                                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                            value={formData.startDate}
                                            aria-label="Seleziona data"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <p className="font-semibold text-left">Data di fine</p>
                                    <div className="flex gap-4">
                                        <input
                                            className="p-2 box-border border-slate-400 border-4 rounded-lg w-full text-md"
                                            type="text"
                                            name="endDate"
                                            placeholder="Data di fine"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="-mx-13 w-5"
                                            type="date"
                                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                            value={formData.endDate}
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

            {filteredAllergies.length === 0 ? (
                <p className="text-center text-gray-500">Nessuna allergia trovata.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-900  border rounded-lg shadow-lg max-w-5xl">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white"> 
                                <th className="py-4 px-8 border-b text-lg">Allergene</th>
                                <th className="py-4 px-8 border-b text-lg">Reazione</th>
                                <th className="py-4 px-8 border-b text-lg">Gravità</th>
                                <th className="py-4 px-8 border-b text-lg">Note</th>
                                <th className="py-4 px-8 border-b text-lg">Data Inizio</th>
                                <th className="py-4 px-8 border-b text-lg">Data Fine</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAllergies.map((allergy) => (
                                <tr key={allergy.id} className="hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white">
                                    <td className="py-3 px-8 border-b">{allergy.allergen}</td>
                                    <td className="py-3 px-8 border-b">{allergy.reaction}</td>
                                    <td className="py-3 px-8 border-b">{allergy.severity}</td>
                                    <td className="py-3 px-8 border-b">{allergy.note}</td>
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