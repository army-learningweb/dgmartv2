interface CardTitleProps {
    title: string;
    className?: string;
}

export default function CardTitle({title, className} : CardTitleProps) {
    return <div className={`font-medium select-none leading-5 truncate ${className}`}>{title}</div>;
}
