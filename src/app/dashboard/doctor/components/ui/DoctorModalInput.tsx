import { cn } from "@/lib/utils";
import React from "react";

export default function DoctorModalInput({
  className,
  label,
  ...props
}: {
  className?: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-bold text-[#908E98]">{label}</label>

      <input {...props} className={cn("rounded-sm p-1 outline", className)} />
    </div>
  );
}
