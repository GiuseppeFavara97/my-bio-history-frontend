
import { Calendar, ChartLine, FilePen, Home, LogOut, MessageSquare, NotebookPen } from "lucide-react";
import { Dispatch, HTMLAttributes, HtmlHTMLAttributes, SetStateAction, useState } from "react"
import { SidebarItem } from "./SidebarItem";
import { motion } from "motion/react"
import { useRouter } from "next/navigation";
type SidebarDoctorProps = {
    open: boolean;
    currentView: string,
    toggle: Dispatch<SetStateAction<boolean>>;
    setCurrentView: Dispatch<SetStateAction<string>>

};

export default function SidebarDoctor({ open, currentView, toggle, setCurrentView }: SidebarDoctorProps) {
    const router = useRouter()

    const handleLogout = () => {
        // Rimuovi il cookie
        document.cookie = "token=; path=/; max-age=0";

        // Redirect al login
        router.push("/");
    };

    function home() {
        router.push("/")
    }

    return (
        <aside id="sidebarDoctor"
            onMouseEnter={() => toggle(false)}
            onMouseLeave={() => toggle(true)}
            className={`outline rounded bg-amber-500 h-full w-1/8 duration-500 ease-in-out ${open ? ("w-20") : ("")} `}
        >
            <div className="flex flex-col items-center justify-center">
                <img onClick={home} src="/logo.png" width={80} className="cursor-pointer" />

                <motion.p
                    animate={{
                        opacity: open ? 0 : 1,
                        x: open ? -20 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-blue-800 font-bold whitespace-nowrap"
                >
                    My Bio History
                </motion.p>
            </div>
            <main className="flex flex-col items-center gap-4">
                <SidebarItem active={currentView === "home"} onClick={() => setCurrentView("home")} open={!open} icon={<Home />} label="Home" />
                <SidebarItem active={currentView === "allegato E"} onClick={() => setCurrentView("allegato E")} open={!open} icon={<FilePen />} label="Allegato E" />
                <SidebarItem active={currentView === "ricette"} onClick={() => setCurrentView("ricette")} open={!open} icon={<NotebookPen />} label="Ricette" />
                <SidebarItem active={currentView === "report"} onClick={() => setCurrentView("report")} open={!open} icon={<ChartLine />} label="Report" />
                <SidebarItem active={currentView === "calendario"} onClick={() => setCurrentView("calendario")} open={!open} icon={<Calendar />} label="Calendario" />
                <SidebarItem active={currentView === "messaggi"} onClick={() => setCurrentView("messaggi")} open={!open} icon={<MessageSquare />} label="Messaggi" />
                
                <SidebarItem  onClick={handleLogout} open={!open} icon={<LogOut/>} label="Log-Out" />
            </main>
        </aside>
    )
}