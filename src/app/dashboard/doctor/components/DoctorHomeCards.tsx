
type DoctorHomeCardsProps = {
    label: string;
    active?: string;
    onClick?: () => void
}

export default function DoctorHomeCards({ active, label, onClick }: DoctorHomeCardsProps) {


    return (
        <div className="">
            <button onClick={onClick} className={`outline rounded-md p-1 w-34 text-center duration-500 cursor-pointer ${active === label && "bg-blue-900 text-white"}`}>{label}</button>
        </div>
    )
}