interface FilterTab {
    onFilter? : () => void;
    children: React.ReactNode;
    active?: boolean;
}

export default function FilterTab ({onFilter, active, children} : FilterTab) {
    return (
        <div
            onClick={onFilter}
            className={`flex gap-1 items-center cursor-pointer rounded-lg px-3 py-1 font-medium bg-white shadow active:translate-y-0.5 transition-all duration-150  ${active && 'text-blue-600'}`}
        >
            {children}
        </div>
    );
}