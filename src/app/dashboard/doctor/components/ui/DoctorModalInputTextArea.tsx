import { cn } from "@/lib/utils";
import React from "react";

export default function DoctorModalInputTextArea({
  className,
  label,
  ...props
}: {
  className?: string;
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <div className="flex flex-col">
      <span className="font-bold text-[#908E98]">{label}</span>
      <textarea
        {...props}
        onInput={(e) => {
          handleInput(e);
          props.onInput?.(e);
        }}
        className={cn("w-100 resize-none rounded-sm outline", className)}
        rows={4}
      />
    </div>
  );
}
