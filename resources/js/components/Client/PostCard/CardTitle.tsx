import { Link } from "@inertiajs/react";

interface CardTitleProps {
    title: string;
    className?: string;
    route?: string;
}

export default function CardTitle({title, className, route} : CardTitleProps) {
    return <Link href={route ?? ''} className={`hover:underline w-50 truncate font-medium select-none line-clamp-2 leading-5 ${className}`}>{title}</Link>;
}
