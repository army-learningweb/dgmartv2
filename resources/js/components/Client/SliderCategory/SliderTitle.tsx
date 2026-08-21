interface TitleSectionProps {
    title: string;
    className?: string;
}

export default function SliderTitle({ title, className }: TitleSectionProps) {
    return (
        <h1
            className={`text-5xl font-medium tracking-tight select-none ${className}`}
        >
            {title}
        </h1>
    );
}
