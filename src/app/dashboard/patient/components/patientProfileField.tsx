import { motion, AnimatePresence } from "motion/react";
import React from "react";

export default function PatientProfileField({
  label,
  value,
  editMode,
  ...props
}: {
  label: string;
  value: string | number ;
  editMode: boolean;
}& React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col overflow-visible rounded-xl p-1 duration-300 hover:bg-gray-100/70">
      <AnimatePresence mode="wait">
        {editMode ? (
          <motion.div
            key="editTrue"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col duration-500"
          >
            <span className="text-sm text-gray-500">{label}</span>
            <input {...props} defaultValue={value ?? ""} className="rounded-md border px-2 py-1 text-lg focus:outline-blue-500 duration-500 ease-in-out" />
          </motion.div>
        ) : (
          <motion.div
            key="editFalse"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col "
          >
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-lg font-medium">{value || "-"}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
