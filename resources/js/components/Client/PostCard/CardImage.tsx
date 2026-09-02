import { Link } from "@inertiajs/react";

interface CardImageProps {
    src: string;
    alt: string;
    route: string
}

export default function CardImage({src, alt, route} : CardImageProps) {
    return (
        <Link href={route} className="item-center w-full overflow-hidden inline-block">
            <img
                src={src}
                alt={alt}
                className="object-cover rounded-xl h-32 w-full"
            />
        </Link>
    );
}
