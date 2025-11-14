'use client'

import { useEffect, useState } from "react"
import Sidebar from "./components/sidebarAdmin";
import { useSharedData } from "../_shared/SharedData";
import ListUsers from "./listUsers";


type User = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}
export default function Pageadmin() {
    const [user, setUser] = useState<User | null>(null)
    const context = useSharedData()
    console.log("contesto", context)
    return (



        <div>
            {context.selectedTab === "listUsers" && (
                <ListUsers />
            )
            }
        </div>


    )

}