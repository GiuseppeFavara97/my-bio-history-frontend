import { motion, AnimatePresence } from "motion/react";
import { ReactNode } from "react";

type SidebarItemProps = {
    icon: ReactNode;
    label: string;
    open: boolean;
    active?: boolean;
    onClick?: () => void;
};

export function SidebarItem({ icon, label, open, active, onClick }: SidebarItemProps) {
    return (
        <div onClick={onClick} className={`flex items-center ml-5 gap-3 w-10/12 rounded-xl duration-500 ease-in-out hover:cursor-pointer  ${active && open ? " bg-blue-500 " : ""}  hover:bg-blue-500`}>
            <div className={`duration-800 ease-in-out shrink-0 ${active && `text-green-500`} `}>{icon}</div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="whitespace-nowrap "
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}
