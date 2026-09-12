interface CardDateProps {
    date:string;
}

export default function CardDate({date} : CardDateProps) {
    return (
        <div className="absolute z-50 rounded-xl rounded-tr-none rounded-bl-none bg-black px-4 py-1 text-white">
            {date}
        </div>
    );
}
