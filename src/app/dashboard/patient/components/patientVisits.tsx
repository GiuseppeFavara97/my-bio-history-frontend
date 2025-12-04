import { Folder, FolderArchive } from "lucide-react";



export default function PatientVisits() {



    return (
        <div className="flex justify-between ">

            <h1 className="font-bold text-2xl"> Visite</h1>
            <div className="flex gap-3 p-1">
                <Folder />
                <FolderArchive />
            </div>

        </div>
    )
}