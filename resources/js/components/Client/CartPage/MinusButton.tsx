import { Minus } from 'lucide-react';

interface MinusButtonProps {
    onClick: () => void;
}

export default function MinusButton({onClick} : MinusButtonProps) {
    return (
        <>
            <div
                onClick={onClick}
                className="cursor-pointer rounded-md bg-gray-200 p-1 transition-transform duration-200 ease-out active:scale-75"
            >
                <Minus size={18} />
            </div>
        </>
    );
}
