import { Link } from "@inertiajs/react";

interface CardImageProps {
    dataImage : string
    dataUrl : string
}

export default function CardImage({dataImage, dataUrl} : CardImageProps) {
    return (
        <Link href={dataUrl} className="item-center w-full h-60 flex items-center justify-center">
            <img
                src={dataImage}
                className="w-35 h-35 object-cover"
            />
        </Link>
    );
}
