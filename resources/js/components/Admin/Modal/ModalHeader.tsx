import { X } from "lucide-react"

interface ModalHeaderProps {
    title: string;
    onClose: () => void;
}

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
    return (
        <header className="flex items-center justify-between">
            <div className="text-[18px] font-medium tracking-tight">
                {title}
            </div>
            <div
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-medium transition-colors duration-150 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={onClose}
            >
                <X
                    size={17}
                    className="text-gray-800 transition-colors duration-150"
                />
                ESC
            </div>
        </header>
    );
}