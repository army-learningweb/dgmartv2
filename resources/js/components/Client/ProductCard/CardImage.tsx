interface CardImageProps {
    dataImage : string
}

export default function CardImage({dataImage} : CardImageProps) {
    return (
        <div className="item-center w-full h-60 flex items-center justify-center">
            <img
                src={dataImage}
                className="w-35 h-35 object-cover"
            />
        </div>
    );
}
