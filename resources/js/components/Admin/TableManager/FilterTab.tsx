import clsx from "clsx";

interface FilterTabProps {
    onFilter?: () => void;
    countData: string | number;
    label: string;
    isActive: boolean;
}

export default function FilterTab({ onFilter, countData, label, isActive }: FilterTabProps) {
    return (
        <div onClick={onFilter} className={clsx("flex items-center gap-1.5 transition-colors duration-150 justify-center rounded-lg py-1 px-2 text-xs font-medium cursor-pointer hover:bg-white hover:shadow select-none", {
            "bg-white shadow": isActive
        })}>
            <div>
                {label}
            </div>
            <div className="bg-gray-200 w-4.75 h-4.75 rounded-full flex items-center justify-center">{countData}</div>
        </div>
    )
}