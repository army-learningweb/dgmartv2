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
                className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-medium transition-colors duration-150 hover:bg-gray-200"
                onClick={onClose}
            >
                <X
                    size={17}
                    className="text-gray-800 transition-colors duration-150"
                />
                <span className="hidden md:block">ESC</span>
            </div>
        </header>
    );
}