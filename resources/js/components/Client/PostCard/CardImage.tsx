import { Link } from "@inertiajs/react";

interface CardImageProps {
    dataImage : {
        file_url: string,
        file_name: string
    }
    route: string
}

export default function CardImage({dataImage, route} : CardImageProps) {
    return (
        <Link href={route} className="item-center w-full h-40 overflow-hidden inline-block">
            <img
                src={dataImage.file_url}
                alt={dataImage.file_name}
                className="object-contain rounded-xl"
            />
        </Link>
    );
}
