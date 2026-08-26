interface TitleSectionProps {
    title: string;
    className?: string;
}

export default function SliderTitle({ title, className }: TitleSectionProps) {
    return (
        <h1
            className={`text-3xl font-bold tracking-tight select-none inline-block${className}`}
        >
            {title}
        </h1>
    );
}
