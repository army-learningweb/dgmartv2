import { Plus } from 'lucide-react';

interface PlusButtonProps {
    onClick: () => void;
    className?: string;
}

export default function PlusButton({ onClick, className }: PlusButtonProps) {
    return (
        <>
            <div
                onClick={onClick}
                className={`cursor-pointer rounded-md bg-gray-200 p-1 transition-transform duration-200 ease-out active:scale-75 ${className}`}
            >
                <Plus size={18} />
            </div>
        </>
    );
}
