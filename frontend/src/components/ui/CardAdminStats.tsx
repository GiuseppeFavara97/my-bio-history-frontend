import { cn } from "@/lib/utils";
import React from "react";

export default function CardAdminStats({ className, children, titleCard, vari, ...props }:React.HTMLAttributes<HTMLDivElement> & { vari?:number,titleCard?:string ,className?: string, children?: React.ReactNode, props?: React.HTMLAttributes<HTMLDivElement> }) {



    return (

        <div className={cn(" rounded-2xl h-25 w-80 shadow-xl shadow-black", className)}>
            <div className="my-1 border-b  "> <p className="font-bold font-mono">{titleCard}</p></div>
            <div {...props} className="flex flex-col justify-center items-center h-full">
                {children} 
                <p className="font-mono font-bold text-2xl"> {vari}</p>
            </div>
        </div>
    )
}