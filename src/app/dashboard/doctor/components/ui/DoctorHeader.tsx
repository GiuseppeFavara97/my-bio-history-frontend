import { Bell, CircleUser } from "lucide-react";
import { useDoctor } from "../shared/DoctorProvider";

export default function DoctorHeader() {
  const doctor = useDoctor().doctor;
  return (
    <header className="h-15 flex w-full items-center justify-between bg-blue-800 text-white">
      <p className="mx-10 text-3xl font-medium">
        Bentornato Dottor {doctor?.firstName} {doctor?.lastName}
      </p>

      <div className="mr-10 flex items-center gap-5">
        <Bell size={20} className="hover:scale-120 cursor-pointer duration-500 ease-in-out" />
        <CircleUser size={35} className="hover:scale-120 cursor-pointer duration-500 ease-in-out" />
      </div>
    </header>
  );
}
