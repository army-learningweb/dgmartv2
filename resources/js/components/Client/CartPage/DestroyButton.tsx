import { X } from 'lucide-react';

interface DestroyButtonProps {
    onClick : () => void;
}

export default function DestroyButton({onClick} : DestroyButtonProps) {
    return (
        <div
            onClick={onClick}
            className="flex cursor-pointer items-center justify-center rounded-md bg-red-50 p-1 text-xs font-medium text-red-600 transition-all duration-150 hover:bg-red-100 active:scale-90"
        >
            <X size={20} />
        </div>
    );
}
