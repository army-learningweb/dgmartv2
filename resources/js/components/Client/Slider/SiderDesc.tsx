interface SliderDescProps {
    children : React.ReactNode
}

export default function SliderDesc({children}: SliderDescProps) {
    return (
        <div className="mt-2 text-[16px] tracking-tight text-gray-500 select-none">
            {children}
        </div>
    );
}
