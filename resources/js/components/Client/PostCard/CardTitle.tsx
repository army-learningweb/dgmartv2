interface CardTitleProps {
    title: string;
    className?: string;
}

export default function CardTitle({title, className} : CardTitleProps) {
    return <div className={`text-[16px] h-11 font-medium select-none line-clamp-2 leading-5 ${className}`}>{title}</div>;
}
