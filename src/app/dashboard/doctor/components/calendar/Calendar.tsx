import LegendColors from "./components/LegendColors";
import { useEffect, useMemo, useState } from "react";
import { getWeekDays, startWeek, timeSlots } from "@/lib/calendar";
import { api } from "@/lib/api/api";
import { ChevronDown } from "lucide-react";

type Appointment = {
    startTime: string; // ISO string dal backend
    status: string;
};

export default function Calendar() {
    const [anchorDate, setAnchorDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [appointments1, setAppointments1] = useState<Appointment[]>([]);
    const [toggleCalendar, setToggleCalendar] = useState<boolean>(false)

    const weekStart = startWeek(anchorDate);
    const weekDays = getWeekDays(weekStart);

    const slots = timeSlots();

    useEffect(() => {
        async function fetchAppointments() {
            const res = await api.get("/appointments");
            const res1 = await api.get("/appointments/doctor/me");
            setAppointments(res.data);
            setAppointments1(res1.data)
        }
        fetchAppointments();
    }, []);

    console.log("doctors/me", appointments1)

    const normalizedAppointments = useMemo(() => {
        const START_HOUR = 9;
        const STEP = 30;

        return appointments.map(a => {
            const date = new Date(a.startTime);

            const dayIndex = weekDays.findIndex(d =>
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
            );

            const minutesFromStart =
                (date.getHours() - START_HOUR) * 60 + date.getMinutes();

            const slotIndex = minutesFromStart / STEP;

            return {
                ...a,
                dayIndex,
                slotIndex,
            };
        });
    }, [appointments, weekDays]);

    return (
        <main className="flex flex-col w-full h-full m-5 ">
            <div className="flex justify-between items-center mb-4 gap-4 w-10/12">
                <div className="flex gap-5 flex-1">
                    <button className="relative" >
                        <p className="flex ">Settimanale <ChevronDown onClick={() => setToggleCalendar(prev => !prev)} className="" /> </p>
                        {toggleCalendar && <div className="absolute rounded-2xl h-30 w-30 left-0 overflow-auto bg-black/80 text-white">
                            <p className="">Mensile</p>
                        </div>}
                    </button>
                    <input type="search" placeholder="Ricerca paziente" className="flex-1" />
                </div>
                <button>Aggiungi visita</button>
            </div>

            <section className="flex justify-between gap-6 w-full">
                <div className="rounded-2xl border overflow-hidden flex-1 bg-[#F1F1F1]">
                    <div className="grid grid-cols-[80px_repeat(7,1fr)] h-10 border-b">
                        <div className="border-r" />
                        {weekDays.map(d => (
                            <div
                                key={d.toISOString()}
                                className="flex items-center justify-center font-semibold border-r last:border-r-0"
                            >
                                {d.toLocaleDateString("it-IT", {
                                    weekday: "short",
                                }).toUpperCase()}
                            </div>
                        ))}
                    </div>

                    <div>
                        {slots.map(hour => (
                            <div
                                key={hour.index}
                                className="grid grid-cols-[80px_repeat(7,1fr)] h-14 border-b last:border-b-0"
                            >
                                <div className="border-r flex items-center justify-center text-sm font-semibold">
                                    {hour.label}
                                </div>

                                {weekDays.map((_, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className="border-r last:border-r-0 hover:bg-gray-300 cursor-pointer relative"
                                    >
                                        {normalizedAppointments.map(a =>
                                            a.dayIndex === colIndex &&
                                                a.slotIndex === hour.index &&
                                                a.status ? (
                                                <div
                                                    key={a.startTime}
                                                    className="absolute inset-1 bg-blue-500 text-white text-xs rounded p-1"
                                                >
                                                    <div> Appuntamento  </div>
                                                    <p>{"Note test"}</p>
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="rounded-md flex flex-col items-center justify-start ">
                    <div className="bg-[#F1F1F1] rounded-xl p-4 flex flex-col items-center gap-3 w-full">
                        <span className="font-bold text-2xl">Legenda colori</span>
                        <LegendColors label="Colore 1" color="bg-[#DBEAFE]" />
                        <LegendColors label="Colore 2" color="bg-[#DCFCE7]" />
                        <LegendColors label="Colore 3" color="bg-[#F7CCFF]" />
                        <LegendColors label="Colore 3" color="bg-[#6D8DB8]" />
                        <LegendColors label="Colore 3" color="bg-[#D9D9D9]" />
                        <LegendColors label="Colore 3" color="bg-[#FF8E8E]" />
                    </div>
                </aside>
            </section>
        </main>
    );
}
