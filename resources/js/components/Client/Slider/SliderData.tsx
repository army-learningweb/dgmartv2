interface SliderDataProps {
    mobilityIndex: number;
    index: number;
    height?: string;
    children: React.ReactNode
}

export default function SliderData({
    mobilityIndex,
    index,
    height,
    children
}: SliderDataProps) {
    return (
        <div className="relative mt-8">
            <div
                style={{
                    transform: `translateX(-${mobilityIndex * index}px)`,
                }}
                className={`pl-4 py-3 md:pl-0 overflow-x-auto md:overflow-visible scrollbar-thin scrollbar-track-transparent mx-auto flex max-w-312 flex-nowrap gap-4 transition-transform duration-500 ease-out select-none ${height}`}
            >
                {children}
            </div>
        </div>
    );
}
