interface CardTitleProps {
    title: string;
}

export default function CardTitle({title} : CardTitleProps) {
    return <div className="w-50 truncate font-medium">{title}</div>;
}
