import { cn } from "@/lib/utils";
import React from "react";

export default function CardAdmin({ className, children, ...props }:React.HTMLAttributes<HTMLDivElement> & { className?: string, children?: React.ReactNode, props?: React.HTMLAttributes<HTMLDivElement> }) {



    return (

        <div className={cn(" rounded-2xl h-25 w-50 max-w-50 shadow-xl shadow-black", className)}>

            <div {...props} className="flex flex-col justify-center items-center h-full">
                {children}
            </div>
        </div>
    )
}