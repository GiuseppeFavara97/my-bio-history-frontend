'use client'
import { useSharedData } from "../_shared/SharedData"

export default  function Page() {
    
      const context=useSharedData()
        console.log(context)
    return (
        
        
        <div className="flex justify-center items-center h-full">
        <p>Dashboard Dottore</p>
        </div>
        
        )
}