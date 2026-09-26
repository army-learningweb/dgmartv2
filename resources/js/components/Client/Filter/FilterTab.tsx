interface FilterTab {
    onFilter?: () => void;
    children: React.ReactNode;
    active?: boolean;
}

export default function FilterTab({ onFilter, active, children }: FilterTab) {
    return (
        <div
            onClick={onFilter}
            className={`flex shrink-0 items-center gap-1 rounded-lg bg-white px-3 py-1 font-medium whitespace-nowrap shadow transition-all duration-150 last-of-type:mr-4 active:translate-y-0.5 md:last-of-type:mr-0 ${active && 'text-blue-600'}`}
        >
            {children}
        </div>
    );
}
