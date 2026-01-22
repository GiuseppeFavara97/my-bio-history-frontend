import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

type LegendColorsProps = {
    label: string,
    color: string,
}
export default function LegendColors({ label, color }: LegendColorsProps) {

    return (
        <>
            <div className="flex gap-3 items-center">
                <div className={cn(`h-10 w-10 rounded-full `, color)}> </div>
                <p>{label}</p>
            </div>
        </>)
}