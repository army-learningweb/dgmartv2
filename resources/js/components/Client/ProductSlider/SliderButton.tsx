interface SliderButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className? : string;
}

export default function SliderButton({
    children,
    className,
    ...props
}: SliderButtonProps) {
    return (
        <div
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white shadow transition-transform duration-150 hover:border-gray-200 active:translate-y-0.5 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
