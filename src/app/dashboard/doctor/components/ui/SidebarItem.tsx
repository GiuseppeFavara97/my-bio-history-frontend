import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode;
  className?: string;
  label: string;
  open: boolean;
  active?: boolean;
  onClick?: () => void;
};

export function SidebarItem({ icon, className, label, open, active, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative ml-5 flex w-10/12 cursor-pointer gap-3 rounded-r-md duration-300 ease-in-out",
        className,
      )}
    >
      <div
        className="
          duration-400
          absolute -left-7
          bottom-0
          right-3
          top-0
          rounded-r-md
          bg-blue-500
          opacity-0
          transition-opacity ease-in-out
          group-hover:opacity-100
          
        "
      />

      {active && open && (
        <div
          className="
            absolute
            -left-7 bottom-0
            right-3
            top-0
            rounded-r-md
            bg-blue-500
            
          "
        />
      )}

      <div className={`duration-800 relative shrink-0 ease-in-out ${active && `text-green-500`} `}>{icon}</div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
