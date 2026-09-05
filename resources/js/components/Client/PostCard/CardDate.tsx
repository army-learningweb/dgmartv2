interface CardDateProps {
    date:string;
}

export default function CardDate({date} : CardDateProps) {
    return (
        <div className="absolute z-50 rounded-lg rounded-tr-none rounded-bl-none bg-black/80 px-4 py-1 text-white">
            {date}
        </div>
    );
}
