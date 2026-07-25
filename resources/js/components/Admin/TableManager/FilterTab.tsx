import clsx from "clsx";

interface FilterTabProps{
    onFilter? : () => void;
    countData: string;
    label: string;
    isActive: boolean;
}

export default function FilterTab({onFilter, countData, label, isActive} : FilterTabProps) {
    return (
        <div onClick={onFilter} className={clsx("flex items-center transition-colors duration-150 justify-center rounded-lg p-1.5 text-xs font-medium cursor-pointer hover:bg-white hover:shadow", {
            "bg-white shadow": isActive
        })}>
            {label} ({countData})
        </div>
    )
}