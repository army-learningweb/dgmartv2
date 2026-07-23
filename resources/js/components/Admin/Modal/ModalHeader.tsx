import { X } from "lucide-react"

interface ModalHeaderProps {
    title: string;
    onClose: () => void;
}

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
    return (
        <header className="flex justify-between items-center">
            <div className="font-medium text-[18px] tracking-tight">{title}</div>
            <div className="p-1" onClick={onClose}>
                <X size={20} className="text-gray-400 hover:text-gray-600 transition-colors duration-150" />
            </div>
        </header>
    )
}