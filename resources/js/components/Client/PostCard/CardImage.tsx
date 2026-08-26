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
        <Link href={route} className="item-center w-full overflow-hidden inline-block">
            <img
                src={dataImage.file_url}
                alt={dataImage.file_name}
                className="object-cover rounded-xl h-32 w-full"
            />
        </Link>
    );
}
