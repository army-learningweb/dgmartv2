import clsx from "clsx";

interface FilterTabProps{
    onFilter : () => void;
    countData: string;
    label: string;
    isActive: boolean;
}

export default function FilterTab({onFilter, countData, label, isActive} : FilterTabProps) {
    return (
        <div onClick={onFilter} className={clsx("flex items-center transition-colors duration-150 border border-gray-100 justify-center rounded-lg p-1.5 text-xs font-medium cursor-pointer", {
            "bg-white border-gray-200 shadow": isActive
        })}>
            {label} ({countData})
        </div>
    )
}