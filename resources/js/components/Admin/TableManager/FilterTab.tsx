import clsx from "clsx";

interface FilterTabProps {
    onFilter?: () => void;
    countData: string | number;
    label: string;
    isActive: boolean;
}

export default function FilterTab({ onFilter, countData, label, isActive }: FilterTabProps) {
    return (
        <>
            <div
                onClick={onFilter}
                className={clsx(
                    'flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium transition-colors duration-150 select-none hover:bg-white hover:shadow',
                    {
                        'bg-white shadow': isActive,
                    },
                )}
            >
                <div>{label}</div>
                <div className="flex h-4.75 w-4.75 items-center justify-center rounded-full bg-gray-200">
                    {countData}
                </div>
            </div>
        </>
    );
}