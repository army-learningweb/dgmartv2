interface CardImageProps {
    dataImage : {
        file_url: string,
        file_name: string
    }
}

export default function CardImage({dataImage} : CardImageProps) {
    return (
        <div className="item-center w-full h-60 flex items-center justify-center">
            <img
                src={dataImage.file_url}
                alt={dataImage.file_name}
                className="w-50 h-50 object-cover"
            />
        </div>
    );
}
