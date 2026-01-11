import { LucideIcon } from "lucide-react";
import React from "react";
type DoctorToolsSectionProps = {
  icon: LucideIcon;
  active?: boolean;
  activeColor?: string;
  label: string;
  onClick: () => void;
};
export default function DoctorToolsSection({
  icon: Icon,
  active = false,
  activeColor = "",
  label,
  onClick,
}: DoctorToolsSectionProps) {
  return (
    <div className="group relative">
      <Icon
        onClick={onClick}
        className={`hover:scale-120 cursor-pointer  rounded-full duration-700 hover:text-blue-500
          ${active ? `${activeColor} scale-110 ring-1` : ""}
        `}
      />
      <span
        className="duration-600 pointer-events-none absolute
        -z-20 rounded bg-black px-2 py-1 text-xs 
        text-white opacity-0
        group-hover:-translate-x-11 group-hover:opacity-100"
      >
        {label}
      </span>
    </div>
  );
}
