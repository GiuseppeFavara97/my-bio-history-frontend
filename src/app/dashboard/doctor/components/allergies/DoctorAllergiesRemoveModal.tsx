
import { softDeleteAllergy } from "@/lib/api/allergy";
import { Allergy } from "@/Types/Types";
import { ArrowLeft } from "lucide-react";


type AllergyRemoveprops = {
  selectedAllergy: Allergy;
  setRemoveModal: (v: boolean) => void;
};

export default function DoctorAllergiesRemoveModal({ selectedAllergy, setRemoveModal }: AllergyRemoveprops) {
    
    
    function softDeletePatch(id:number) {
        
        softDeleteAllergy(id)
    }
    
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/30">
      <div className="relative flex flex-col gap-5 rounded-2xl bg-white p-5 outline">
        <p
          className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full ring-2 hover:bg-red-400 hover:ring-red-800"
          onClick={() => setRemoveModal(false)}
        >
          <ArrowLeft />{" "}
        </p>
        <span>Allergia selezionata</span>
        <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Allergene</span>
        <p className="border rounded-md text-center">{selectedAllergy?.allergen}</p>
        </div>
        <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Reazioni</span>
        <p className="border rounded-md text-center">{selectedAllergy?.reaction}</p>
        </div>
        <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Data di inizio</span>
        <p className="border rounded-md text-center">{selectedAllergy?.startDate ? selectedAllergy.startDate.toLocaleDateString() : "-"}</p>
        </div>
        <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Note</span>
        <p className="border rounded-md text-center">{selectedAllergy?.note}</p>
        </div>
        <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Gravità</span>
        <p className="border rounded-md text-center">{selectedAllergy?.severity}</p>
        </div>
        <button type="button" onClick={() => softDeletePatch(selectedAllergy?.id)} className="ring-2 ring-blue-600 hover:ring-red-500 hover:bg-red-200 cursor-pointer rounded-md">Conferma cancellazione</button>
      </div>
    </div>
  );
}
