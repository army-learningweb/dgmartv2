import { Link } from '@inertiajs/react';

interface CardTitleProps {
    title: string;
    className?: string;
    route?: string;
}

export default function CardTitle({ title, className, route }: CardTitleProps) {
    return (
        <Link
            href={route ?? ''}
            className={`inline-block md:w-50 w-40 truncate leading-5 font-medium select-none hover:underline ${className}`}
        >
            {title}
        </Link>
    );
}
