import { CircleX } from "lucide-react";

interface FilterItemProps {
    value: string;
    active: boolean;
    onFilter: () => void;
    onRemove: () => void;
}

export default function FilterItem({ value, active, onFilter, onRemove }: FilterItemProps) {
    return (
        <div
            className={`flex cursor-pointer items-center justify-between rounded-md pl-2 pr-1 py-1.25 transition-colors duration-150 
                ${active ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                onClick={!active ? onFilter : undefined}
        >
            <span>{value}</span>

            {active && (
                <CircleX
                    onClick={onRemove}
                    size={20}
                    className="cursor-pointer fill-black/60 text-white hover:fill-black/80 active:fill-black"
                />
            )}
        </div>
    );
}
