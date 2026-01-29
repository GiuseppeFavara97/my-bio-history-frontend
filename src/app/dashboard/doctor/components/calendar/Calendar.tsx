import LegendColors from "./components/LegendColors";
import { useEffect, useMemo, useState, useCallback } from "react";
import { getWeekDays, startWeek, addDays, timeSlots } from "@/lib/calendar";
import { api } from "@/lib/api/api";
import { AppointmentResponseDTO } from "@/Types/Types";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

type ViewMode = "weekly" | "monthly";

export default function Calendar() {
    const [anchorDate, setAnchorDate] = useState(new Date());
    const [appointments, setAppointments] = useState<AppointmentResponseDTO[]>([]);
    const [patientNames, setPatientNames] = useState<Record<number, string>>({});
    const [toggleCalendar, setToggleCalendar] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("weekly");
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentResponseDTO | null>(null);

    const weekStart = startWeek(anchorDate);
    const weekDays = getWeekDays(weekStart);
    const slots = timeSlots();

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const res = await api.get("/appointments/doctor/me");
                setAppointments(res.data);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            }
        }
        fetchAppointments();
    }, []);

    // Fetch patient names for all unique patientIds
    useEffect(() => {
        const uniqueIds = [...new Set(appointments.map(a => a.patientId))];
        const missingIds = uniqueIds.filter(id => !(id in patientNames));

        if (missingIds.length === 0) return;

        async function fetchPatients() {
            const entries: [number, string][] = [];
            await Promise.all(
                missingIds.map(async (id) => {
                    try {
                        const { data } = await api.get(`/patients/byId/${id}`);
                        entries.push([id, `${data.firstName} ${data.lastName}`]);
                    } catch {
                        entries.push([id, `Paziente #${id}`]);
                    }
                })
            );
            setPatientNames(prev => {
                const next = { ...prev };
                entries.forEach(([id, name]) => { next[id] = name; });
                return next;
            });
        }
        fetchPatients();
    }, [appointments]);

    const getPatientName = useCallback((patientId: number) => {
        return patientNames[patientId] ?? "...";
    }, [patientNames]);

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

            const slotIndex = Math.floor(minutesFromStart / STEP);

            return {
                ...a,
                dayIndex,
                slotIndex,
            };
        });
    }, [appointments, weekDays]);

    const monthDays = useMemo(() => {
        const year = anchorDate.getFullYear();
        const month = anchorDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        const days: (Date | null)[] = [];

        for (let i = 0; i < startOffset; i++) {
            days.push(null);
        }
        for (let d = 1; d <= lastDay.getDate(); d++) {
            days.push(new Date(year, month, d));
        }
        while (days.length % 7 !== 0) {
            days.push(null);
        }

        return days;
    }, [anchorDate]);

    const appointmentsByDate = useMemo(() => {
        const map = new Map<string, AppointmentResponseDTO[]>();
        appointments.forEach(a => {
            const date = new Date(a.startTime);
            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(a);
        });
        return map;
    }, [appointments]);

    function navigatePrev() {
        if (viewMode === "weekly") {
            setAnchorDate(prev => addDays(prev, -7));
        } else {
            setAnchorDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        }
    }

    function navigateNext() {
        if (viewMode === "weekly") {
            setAnchorDate(prev => addDays(prev, 7));
        } else {
            setAnchorDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        }
    }

    function selectViewMode(mode: ViewMode) {
        setViewMode(mode);
        setToggleCalendar(false);
    }

    const statusLabels: Record<string, string> = {
        SCHEDULED: "Programmato",
        CONFIRMED: "Confermato",
        CANCELLED: "Cancellato",
        COMPLETED: "Completato",
    };

    const headerLabel = viewMode === "weekly"
        ? `${weekDays[0].toLocaleDateString("it-IT", { day: "numeric", month: "short" })} - ${weekDays[6].toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" })}`
        : anchorDate.toLocaleDateString("it-IT", { month: "long", year: "numeric" });

    const dayNames = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
    const today = new Date();

    return (
        <main className="flex flex-col w-full h-full m-5">
            <div className="flex justify-between items-center mb-4 gap-4 w-10/12">
                <div className="flex gap-5 flex-1 items-center">
                    <button className="relative">
                        <p className="flex items-center gap-1" onClick={() => setToggleCalendar(prev => !prev)}>
                            {viewMode === "weekly" ? "Settimanale" : "Mensile"} <ChevronDown />
                        </p>
                        {toggleCalendar && (
                            <div className="absolute z-10 rounded-2xl left-0 overflow-hidden bg-black/80 text-white">
                                <p className="px-4 py-2 hover:bg-white/20 cursor-pointer" onClick={() => selectViewMode("weekly")}>Settimanale</p>
                                <p className="px-4 py-2 hover:bg-white/20 cursor-pointer" onClick={() => selectViewMode("monthly")}>Mensile</p>
                            </div>
                        )}
                    </button>

                    <div className="flex items-center gap-2">
                        <button onClick={navigatePrev}><ChevronLeft size={20} /></button>
                        <span className="font-semibold min-w-[200px] text-center">{headerLabel}</span>
                        <button onClick={navigateNext}><ChevronRight size={20} /></button>
                    </div>

                    <input type="search" placeholder="Ricerca paziente" className="flex-1" />
                </div>
                <button>Aggiungi visita</button>
            </div>

            <section className="flex justify-between gap-6 w-full">
                {viewMode === "weekly" ? (
                    <div className="rounded-2xl border overflow-hidden flex-1 bg-[#F1F1F1]">
                        <div className="grid grid-cols-[80px_repeat(7,1fr)] h-10 border-b">
                            <div className="border-r" />
                            {weekDays.map(d => (
                                <div
                                    key={d.toISOString()}
                                    className={`flex items-center justify-center font-semibold border-r last:border-r-0 ${
                                        d.toDateString() === today.toDateString() ? "bg-blue-100" : ""
                                    }`}
                                >
                                    {d.toLocaleDateString("it-IT", { weekday: "short" }).toUpperCase()}{" "}
                                    {d.getDate()}
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
                                                        key={a.id}
                                                        className="absolute inset-1 bg-blue-500 text-white text-xs rounded p-1 overflow-hidden cursor-pointer"
                                                        onClick={() => setSelectedAppointment(a)}
                                                    >
                                                        <div className="font-semibold">
                                                            {new Date(a.startTime).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                                                        </div>
                                                        <p className="truncate">{getPatientName(a.patientId)}</p>
                                                    </div>
                                                ) : null
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border overflow-hidden flex-1 bg-[#F1F1F1]">
                        <div className="grid grid-cols-7 border-b">
                            {dayNames.map(name => (
                                <div key={name} className="flex items-center justify-center font-semibold h-10 border-r last:border-r-0">
                                    {name}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7">
                            {monthDays.map((day, i) => {
                                const key = day ? `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}` : `empty-${i}`;
                                const dayAppointments = day ? (appointmentsByDate.get(key) ?? []) : [];
                                const isToday = day?.toDateString() === today.toDateString();

                                return (
                                    <div
                                        key={key}
                                        className={`border-r border-b last:border-r-0 min-h-[80px] p-1 ${
                                            day ? "hover:bg-gray-300 cursor-pointer" : "bg-gray-200/50"
                                        } ${isToday ? "bg-blue-50" : ""}`}
                                    >
                                        {day && (
                                            <>
                                                <div className={`text-sm font-semibold mb-1 ${isToday ? "text-blue-600" : ""}`}>
                                                    {day.getDate()}
                                                </div>
                                                {dayAppointments.map(a => (
                                                    <div
                                                        key={a.id}
                                                        className="bg-blue-500 text-white text-xs rounded px-1 py-0.5 mb-0.5 truncate cursor-pointer"
                                                        onClick={() => setSelectedAppointment(a)}
                                                    >
                                                        {new Date(a.startTime).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                                                        {" - "}{getPatientName(a.patientId)}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <aside className="rounded-md flex flex-col items-center justify-start">
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

            {/* Appointment detail modal */}
            {selectedAppointment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedAppointment(null)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Dettaglio Appuntamento</h2>
                            <button onClick={() => setSelectedAppointment(null)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <span className="text-sm text-gray-500">Paziente</span>
                                <p className="font-semibold">{getPatientName(selectedAppointment.patientId)}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Data e ora</span>
                                <p className="font-semibold">
                                    {new Date(selectedAppointment.startTime).toLocaleString("it-IT", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Stato</span>
                                <p className="font-semibold">{statusLabels[selectedAppointment.status] ?? selectedAppointment.status}</p>
                            </div>
                            {selectedAppointment.reason && (
                                <div>
                                    <span className="text-sm text-gray-500">Motivo</span>
                                    <p className="font-semibold">{selectedAppointment.reason}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-sm text-gray-500">ID Appuntamento</span>
                                <p className="font-semibold">#{selectedAppointment.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
