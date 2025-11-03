import axios from "axios"
import Select from 'react-select';
import { useEffect, useState } from "react"
import { User } from "@/Types/Types";
import CardAdmin from "@/components/ui/CardAdmin";
import { Settings } from "lucide-react";
import { Bar, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts"
import CardAdminStats from "@/components/ui/CardAdminStats";

export default function ListUsers() {
    const [users, setUsers] = useState([])
    const [selectOption, setSelectOptions] = useState<option[]>()
    const [selectedOption, setSelectedOption] = useState<option>()
    const [userModify, setModify] = useState<Partial<User>>({})
    let stats = NumberStats(users)

    function NumberStats(users: User[]) {
        let nPatients = users.filter(user => { return user.role === "patient" })
        let nDoctor = users.filter(user => { return user.role === "doctor" })
        let nAdmin = users.filter(user => { return user.role === "admin" })
        return {
            patients: nPatients.length,
            doctors: nDoctor.length,
            admins: nAdmin.length,
        }
    }
    console.log("Npazienti", stats)
    type option = {
        value: number,
        label: string,
        user: User,
    }


    useEffect(() => {
        (async () => {

            const res = await axios.get("http://localhost:3001/api/users", { withCredentials: true })
            setUsers(res.data)
            const options = res.data.map((user: User) => ({ value: user.id, label: user.firstName, user: user }))
            setSelectOptions(options)
        })
            ()
    }, [selectedOption])
    console.log("selezionato", selectedOption)
    console.log("Modifiche", userModify)
    console.log("Modifiche", users)



    async function handleModify() {
        try {
            const modifies = {}

            for (const i in userModify) {

                if (userModify[i].trim() !== "") {
                    modifies[i] = userModify[i]
                }
            }
            console.log("modifiche pulite", modifies)
            console.log("modifiche NOT pulite", userModify)
            const sent = await axios.patch(`http://localhost:3001/api/users/${selectedOption?.value}`, modifies, { withCredentials: true })
        } catch (error) {
            console.error("error", error)
        }
    }

    return (
        <div className="flex flex-col  text-black dark:text-white bg-gradient-to-b from-cyan-100 to-cyan-300 dark:from-gray-700 dark:to-gray-900 ">
            <h1 className="text-3xl font-bold text-center ">Dashboard</h1>
            <div className=" flex  justify-evenly items-center w-full outline h-40 ">
                <CardAdmin onClick={() => console.log("hello")} className="" ><Settings /> Testo </CardAdmin>
                <CardAdmin />
                <CardAdmin />
                <CardAdmin />
                <CardAdmin />

            </div>
            <div className="flex justify-evenly  w-full h-40 items-center">
                <CardAdminStats titleCard="Utenti Registrati" vari={users?.length}></CardAdminStats>
                <CardAdminStats titleCard="Pazienti" vari={stats.patients}></CardAdminStats>
                <CardAdminStats titleCard="Dottori" vari={stats.doctors} ></CardAdminStats>

            </div>
            <div className="justify-center items-center outline place-items-center ">
                <PieChart width={300} height={300} >
                    <Pie
                        data={[
                            { name: "pazieti", value: stats.patients },
                            { name: "dottori", value: stats.doctors },
                            { name: "Admin", value: stats.admins },
                        ]} // alcune descrizione per non dimenticare
                        dataKey="value"   // usa "value" per le dimensioni
                        nameKey="name"    // etichetta per ogni fetta
                        cx="50%"          // posizione centro X
                        cy="50%"          // posizione centro Y
                        outerRadius={100} // raggio della torta
                        label             // mostra le etichette
                    >    {/* colorare le fette di torta  1 per 1 chiamo sempre Cell (per non dimenticare)*/}
                        <Cell stroke="black" strokeWidth={2} fill="green" />
                        <Cell fill="blue" strokeWidth={2} />
                        <Cell fill="purple" />

                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div className="basis-1/2 flex flex-col border-b rounded-xl shrink-0  ">
                <div className="w-full flex flex-col border-b border-y-gray-500 ">
                    <span className="self-center text-2xl font-bold">Seleziona Utente</span>
                    <Select className="text-black w-90 self-center" options={selectOption} value={selectedOption} onChange={(value) => setSelectedOption(value as option)} />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">Modifica Utente</span>
                    <span>Codice Fiscale</span>
                    <input
                        className="border-1 rounded"
                        type="text"
                        placeholder={selectedOption?.user.taxCode}
                    />
                </div>
                <div className="p-3 grid grid-cols-3 gap-8 justify-center">
                    <div className="flex flex-col">
                        <span >Username</span>

                        <input
                            className="border-1 rounded"
                            type="text"
                            name="firstName"
                            onChange={(e) => setModify(prev => ({ ...prev, username: e.target.value }))}
                            placeholder={selectedOption?.user.username}
                        />
                    </div>


                    <div className="flex flex-col ">
                        <span>Nome</span>
                        <input
                            className="border-1 rounded"
                            type="text"
                            placeholder={selectedOption?.user.firstName}
                            onChange={(e) => setModify(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>Cognome</span>
                        <input
                            className="border-1 rounded"
                            type="text"
                            placeholder={selectedOption?.user.lastName}
                            onChange={(e) => setModify(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>Email</span>
                        <input
                            className="border-1 rounded"
                            type="text"
                            placeholder={selectedOption?.user.email}
                            onChange={(e) => setModify(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>Data di nascita</span>
                        <input
                            className="border-1 rounded"
                            type="date"
                            placeholder={selectedOption?.user.birthday}
                            onChange={(e) => setModify(prev => ({ ...prev, birthday: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>Luogo di nascita</span>
                        <input
                            className="border-1 rounded"
                            type="text"
                            placeholder={selectedOption?.user.birthdayPlace}
                            onChange={(e) => setModify(prev => ({ ...prev, birthdayPlace: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>Numero di telefono</span>
                        <input
                            className="border-1 rounded"
                            type="number"
                            placeholder={selectedOption?.user.phoneNumber}
                            onChange={(e) => setModify(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>Provincia</span>
                        <input
                            className="border-1 rounded"
                            type="text"
                            placeholder={selectedOption?.user.province}
                            onChange={(e) => setModify(prev => ({ ...prev, province: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>Sesso</span>
                        <input
                            className="border-1 rounded"
                            type="text"
                            placeholder={selectedOption?.user.sex}
                            onChange={(e) => setModify(prev => ({ ...prev, sex: e.target.value }))}
                        />
                    </div>

                </div>
                <button onClick={handleModify} className="border-2 rounded-2xl w-50 self-center p-2 m-2 hover:cursor-pointer hover:bg-cyan-500 hover:scale-120 duration-500 "> Invia Modifiche</button>
            </div >
            <div id="Userdata" className="basis-1/2 outline flex flex-col  rounded-2xl p-2 m-2">
                <span className="self-center text-2xl font-bold ">Dati Utente</span>
                <div className="flex flex-col items-center border-b">
                    <span> Codice Fiscale</span>
                    {selectedOption?.user.taxCode}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col ">
                        <span>Username</span>
                        <span className="outline rounded">{selectedOption?.user.username}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span>Nome</span>
                        <span className="outline rounded">{selectedOption?.user.firstName}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span>Cognome</span>
                        <span className="outline rounded">{selectedOption?.user.lastName}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span>Email</span>
                        <span className="outline rounded">{selectedOption?.user.email}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span>Data di nascita</span>
                        <span className="outline rounded">{selectedOption?.user.birthday}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span>Luogo di nascita</span>
                        <span className="outline rounded">{selectedOption?.user.birthdayPlace}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span>Numero di telefono</span>
                        <span className="outline rounded">{selectedOption?.user.phoneNumber}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span>Provincia</span>
                        <span className="outline rounded">{selectedOption?.user.province}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span className="">Sesso</span>
                        <span className="outline  rounded">{selectedOption?.user.sex}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span className="">Ruolo</span>
                        <span className="outline  rounded">{selectedOption?.user.role}</span>
                    </div>


                </div>
            </div>

            <div className=" ml-auto basis-1/4 border border-green-500  ">
                <div> Ipotetici Grafici</div>
                <img
                    src="../Graph.png"
                    alt="test"
                    height={220}
                    width={200}
                ></img>
            </div>

        </div >

    )
}

