import { Plus } from 'lucide-react';

interface PlusButtonProps {
    onClick: () => void;
}

export default function PlusButton({onClick} : PlusButtonProps) {
    return (
        <>
            <div
                onClick={onClick}
                className="cursor-pointer rounded-md bg-gray-200 p-1 transition-transform duration-200 ease-out active:scale-75"
            >
                <Plus size={18} />
            </div>
        </>
    );
}
