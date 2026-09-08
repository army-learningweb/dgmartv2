interface FilterTab {
    onFilter? : () => void;
    children: React.ReactNode;
    active?: boolean;
}

export default function FilterTab ({onFilter, active, children} : FilterTab) {
    return (
        <div
            onClick={onFilter}
            className={`flex gap-1 items-center cursor-pointer rounded-lg px-3 py-1 font-medium transition-colors duration-150 hover:bg-blue-600 hover:text-white ${active && 'bg-blue-600 text-white'}`}
        >
            {children}
        </div>
    );
}