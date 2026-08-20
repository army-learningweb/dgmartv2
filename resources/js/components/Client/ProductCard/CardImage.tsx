interface CardImageProps {
    dataImage : {
        file_url: string,
        file_name: string
    }
}

export default function CardImage({dataImage} : CardImageProps) {
    return (
        <div className="item-center flex h-45 w-full justify-center">
            <img
                src={dataImage.file_url}
                alt={dataImage.file_name}
                className="h-44 w-44 object-cover"
            />
        </div>
    );
}
