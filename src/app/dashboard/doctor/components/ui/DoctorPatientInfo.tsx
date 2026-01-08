import { Patient } from "@/Types/Types";
import ModalBaseLayout from "./ModalBaseLayout";

export default function DoctorPatientInfo({
  selectedPatient,
  children,
}: {
  selectedPatient: Patient;
  children?: React.ReactNode;
}) {
  return (
    <section className="mr-10 flex flex-col h-full">
      {selectedPatient && (
        <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-2xl h-full">
          <span className="text-2xl font-bold text-gray-800">
            {selectedPatient.firstName} {selectedPatient.lastName}
          </span>

          <hr className="border-gray-300/40" />

          <div className="grid grid-cols-2 gap-x-10 h-full">
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-500">Codice fiscale</span>
              <p className="text-gray-800 wrap-break-word ">{selectedPatient.taxCode}</p>
            </div>

            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-500">Data di nascita</span>
              <p className="text-gray-800 ">{new Date(selectedPatient.birthday).toLocaleDateString()}</p>
            </div>

            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-500">Età</span>
              <p className="text-gray-800">{selectedPatient.age}</p>
            </div>

            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-500">Sesso</span>
              <p className="text-gray-800">{selectedPatient.sex}</p>
            </div>

            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-500">Comune</span>
              <p className="text-gray-800">{selectedPatient.municipality}</p>
            </div>

            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-500">Provincia</span>
              <p className="text-gray-800">{selectedPatient.province}</p>
            </div>

            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-500">Stato</span>
              <p className="text-gray-800">{selectedPatient.state}</p>
            </div>

            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-500">Telefono</span>
              <p className="text-gray-800">{selectedPatient.phoneNumber}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
