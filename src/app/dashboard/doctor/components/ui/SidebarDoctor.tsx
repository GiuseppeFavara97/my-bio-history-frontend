import { Calendar, ChartLine, FilePen, Home, LogOut, MessageSquare, NotebookPen, Settings } from "lucide-react";
import { Dispatch, HTMLAttributes, HtmlHTMLAttributes, SetStateAction, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useDoctor } from "../shared/DoctorProvider";
import { useTranslation } from "@/components/language-provider";

export default function SidebarDoctor() {
  const { currentView, setCurrentView, toggleSideBar, setToggleSideBar } = useDoctor();
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/");
  };

  function home() {
    router.push("/");
  }

  return (
    <aside
      id="sidebarDoctor"
      onMouseEnter={() => setToggleSideBar(true)}
      onMouseLeave={() => setToggleSideBar(false)}
      className={`w-1/8 h-full  bg-[#F1F1F1] dark:bg-card  duration-500 ease-in-out ${toggleSideBar ? "" : "w-20"} `}
    >
      <div className="flex flex-col items-center justify-center">
        <img onClick={home} src="/logo.png" width={80} className="cursor-pointer" />

        <motion.p
          animate={{
            opacity: toggleSideBar ? 1 : 0,
            x: toggleSideBar ? 0 : -20,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="whitespace-nowrap font-bold text-blue-800 dark:text-blue-400"
        >
          My Bio History
        </motion.p>
      </div>
      <main className="flex flex-col items-center gap-4 ">
        <SidebarItem
          className=""
          active={currentView === "home"}
          onClick={() => setCurrentView("home")}
          open={toggleSideBar}
          icon={<Home />}
          label={t("home")}
        />
        <SidebarItem
          active={currentView === "allegato E"}
          onClick={() => setCurrentView("allegato E")}
          open={toggleSideBar}
          icon={<FilePen />}
          label={t("allegato_e")}
        />
        <SidebarItem
          active={currentView === "ricette"}
          onClick={() => setCurrentView("ricette")}
          open={toggleSideBar}
          icon={<NotebookPen />}
          label={t("recipes")}
        />
        <SidebarItem
          active={currentView === "report"}
          onClick={() => setCurrentView("report")}
          open={toggleSideBar}
          icon={<ChartLine />}
          label={t("reports")}
        />
        <SidebarItem
          active={currentView === "calendario"}
          onClick={() => setCurrentView("calendario")}
          open={toggleSideBar}
          icon={<Calendar />}
          label={t("calendar")}
        />
        <SidebarItem
          active={currentView === "messaggi"}
          onClick={() => setCurrentView("messaggi")}
          open={toggleSideBar}
          icon={<MessageSquare />}
          label={t("messages")}
        />
        <SidebarItem
          active={currentView === "settings"}
          onClick={() => setCurrentView("settings")}
          open={toggleSideBar}
          icon={<Settings />}
          label={t("settings")}
        />

        <SidebarItem onClick={handleLogout} open={toggleSideBar} icon={<LogOut />} label={t("logout")} />
      </main>
    </aside>
  );
}
