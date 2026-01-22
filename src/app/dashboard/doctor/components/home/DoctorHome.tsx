import {
  Bell,
  CircleUser,
  EyeOff,
  Notebook,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import DoctorHomeCards from "../ui/DoctorHomeCards";
import DoctorVaccinesPatient from "../vaccines/DoctorVaccinesList";

import { Allergy, Care, Diagnosis, MedicalRecord, Patient, Vaccine } from "@/Types/Types";
import { getPatients } from "@/lib/api/patient";

import { SkeletonDemo } from "@/components/ui/SkeletonDemo";
import DoctorAllergiesList from "../allergies/DoctorAllergiesList";
import DoctorDiagnosisList from "../diagnosis/DoctorDiagnosisList";
import { useDoctor } from "../shared/DoctorProvider";
import { AnimatePresence, motion } from "framer-motion";
import DoctorCareList from "../cares/DoctorCareList";
import { getMedicalRecordById } from "@/lib/api/medicalRecord";
import { getPatientsByDoctorIdFilter } from "@/lib/api/doctor";

export default function DoctorHome() {
  const [loadingPatients, setLoadingPatients] = useState<boolean>(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [cares, setCares] = useState<Care[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>("Riepilogo");
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>();
  const [togglePatientSection, setTogglePatientSection] = useState<boolean>(true);
  const [search, setSearch] = useState<{
    firstName?: string;
    lastName?: string;
  }>({});
  const [searchOpen, setSearchOpen] = useState(false);

  const doctor = useDoctor().doctor;
  useEffect(() => {
    async function fetchPatients() {
      try {
        if (!doctor) return;
        setLoadingPatients(true);

        const data = await getPatientsByDoctorIdFilter(doctor.id, search.firstName);
        setPatients(data);
        setSelectedPatient(data[0]);
      } catch (err) {
        console.error("errore nel caricamento pazienti", err);
      } finally {
        setLoadingPatients(false);
      }
    }
    fetchPatients();
  }, [doctor]);

  async function fetchMedicalRecord(id: number) {
    setMedicalRecord(null);
    setAllergies([]);
    setVaccines([]);
    setDiagnoses([]);
    setCares([]);

    const data: MedicalRecord = await getMedicalRecordById(id);

    setMedicalRecord(data);
    setAllergies(data.allergies);
    setVaccines(data.vaccines);
    setDiagnoses(data.diagnosis);
    setCares(data.cares);
  }

  useEffect(() => {
    if (!selectedPatient) return;

    fetchMedicalRecord(selectedPatient.id);
  }, [selectedPatient]);
  return (
    <main className="flex h-full w-full flex-col overflow-hidden">
      <div id="right" className=" relative flex w-full flex-1 overflow-hidden ">
        <AnimatePresence mode="wait">
          {togglePatientSection ? (
            ""
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: -100 }}
              style={{ writingMode: "vertical-rl" }}
              className="group absolute left-0  top-0 rounded-xl "
            >
              {" "}
              <div className="flex flex-col items-center duration-700 group-hover:font-bold ">
                <PanelLeftOpen
                  onClick={() => setTogglePatientSection(true)}
                  className=" hover:scale-120 duration-500 hover:translate-x-2 hover:cursor-pointer"
                />
                Pazienti
              </div>
            </motion.div>
          )}

          {togglePatientSection && (
            <motion.aside
              key="PatientsectionView"
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: -20000, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={` duration-600  flex h-full w-3/12 items-center justify-center ease-in-out`}
            >
              <div className="h-11/12 relative flex w-10/12 flex-col rounded-2xl bg-[#F1F1F1]">
                <div id="filtersection" className="flex w-full items-center gap-2 p-2">
                  <input
                    type="search"
                    className="w-full rounded-2xl px-3 py-1 text-sm font-extralight ring"
                    placeholder="Cerca paziente per nome o CF"
                  />
                  {togglePatientSection && (
                    <PanelLeftClose onClick={() => setTogglePatientSection(false)} className="" />
                  )}
                </div>
                <div id="Patientlist" className="flex-1 overflow-auto p-1">
                  {loadingPatients ? (
                    <div>
                      <SkeletonDemo />
                      <SkeletonDemo />
                      <SkeletonDemo />
                      <SkeletonDemo />
                      <SkeletonDemo />
                      <SkeletonDemo />
                      <SkeletonDemo />
                      <SkeletonDemo />
                      <SkeletonDemo />
                      <SkeletonDemo />
                    </div>
                  ) : (
                    Array.isArray(patients) &&
                    patients.length > 0 &&
                    patients.map((patient: Patient, i) => (
                      <div
                        key={patient.id}
                        onClick={() => setSelectedPatient(patients[i])}
                        className=" rounded-md outline  "
                      >
                        <div className="flex">
                          <img src="/barney.webp" className="h-20 w-20 rounded-full p-3 " />
                          <div className="flex flex-col">
                            <span>
                              {patient.firstName} {patient.lastName}
                            </span>
                            <span className="text-sm font-light">Età: {patient.age}</span>
                            <span className="text-sm font-light">CF: {patient.taxCode}</span>
                          </div>
                          <span></span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        <div className="flex flex-1 flex-col overflow-hidden" id="rightpart ">
          <div className="m-10 flex w-10/12 flex-col self-center rounded-2xl p-3 outline-2 outline-black bg-[#F1F1F1]">
            <span className="text-2xl font-bold">Cartella clinica paziente</span>
            <div className="ml-2 flex flex-col">
              <p className="flex font-medium ">
                {selectedPatient?.firstName} {selectedPatient?.lastName}
              </p>
              <div className="flex gap-3 ">
                <p className="flex text-sm font-light ">
                  Data di nascità:{" "}
                  {selectedPatient?.birthday ? new Date(selectedPatient.birthday).toLocaleDateString() : "-"}
                </p>
                <p className="flex text-sm font-light">Età: {selectedPatient?.age}</p>
                <p className="flex text-sm font-light">CF: {selectedPatient?.taxCode}</p>
              </div>
              <span className="w-30 my-2 rounded-2xl bg-amber-900 p-1 text-white ring-1  ">Allergie: Noci</span>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex w-10/12 justify-between  gap-5 ">
              <DoctorHomeCards
                onClick={() => setSelectedButton("Riepilogo")}
                active={selectedButton}
                label="Riepilogo"
              />
              <DoctorHomeCards onClick={() => setSelectedButton("Allergie")} active={selectedButton} label="Allergie" />
              <DoctorHomeCards onClick={() => setSelectedButton("Diagnosi")} active={selectedButton} label="Diagnosi" />
              <DoctorHomeCards onClick={() => setSelectedButton("Terapie")} active={selectedButton} label="Terapie" />
              <DoctorHomeCards onClick={() => setSelectedButton("Visite")} active={selectedButton} label="Visite" />
              <DoctorHomeCards onClick={() => setSelectedButton("Vaccini")} active={selectedButton} label="Vaccini" />
            </div>
          </div>
          <div className=" m-8 flex flex-1 overflow-hidden">
            <div className="flex-3 mx-10 flex flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-[#F1F1F1] p-2 outline ">
              {selectedButton == "Riepilogo" ? (
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">Riepilogo</span>
                  {!selectedPatient && "seleziona un Paziente"}
                </div>
              ) : selectedButton == "Allergie" ? (
                <div>
                  <span className="text-3xl font-bold">Allergie</span>
                  <DoctorAllergiesList
                    allergies={allergies}
                    selectedPatient={selectedPatient}
                    onAllergyChanged={() => fetchMedicalRecord(selectedPatient!.id)}
                  />
                </div>
              ) : selectedButton == "Vaccini" ? (
                <div className="">
                  <span className="text-3xl font-bold">Vaccini</span>
                  <DoctorVaccinesPatient
                    vaccines={vaccines}
                    selectedPatient={selectedPatient}
                    onVaccineChange={() => fetchMedicalRecord(selectedPatient!.id)}
                  />
                </div>
              ) : selectedButton == "Diagnosi" ? (
                <div>
                  <span className="text-3xl font-bold">Diagnosi</span>

                  <DoctorDiagnosisList
                    diagnoses={diagnoses}
                    selectedPatient={selectedPatient}
                    onDiagnosisChange={() => fetchMedicalRecord(selectedPatient!.id)}
                  />
                </div>
              ) : selectedButton == "Terapie" ? (
                <div className="">
                  <span className="text-3xl font-bold">Terapie</span>

                  <DoctorCareList
                    cares={cares}
                    diagnoses={diagnoses}
                    selectedPatient={selectedPatient}
                    onCaresChange={() => fetchMedicalRecord(selectedPatient!.id)}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex-1 rounded-2xl bg-[#F1F1F1] p-2 outline">
              <p className="text-center text-xl font-bold">Appuntamenti</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/*useEffect(() => {
    if (!selectedPatient) return;
    async function fetchPatientData(id: number) {
      setAllergies(await getAllergiesByPatientId(id));
      setVaccines(await getVaccinesByPatientId(id));
    }

    fetchPatientData(selectedPatient.medicalRecord.id);
  }, [selectedPatient]); */
