interface CardTitleProps {
    title: string;
    className?: string;
}

export default function CardTitle({title, className} : CardTitleProps) {
    return <div className={`text-lg font-medium select-none h-10 line-clamp-2 leading-5 ${className}`}>{title}</div>;
}
