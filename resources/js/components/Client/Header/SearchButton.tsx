import { Search } from "lucide-react";

interface SearchButtonProps{
    onClick : () => void; 
    className?: string;
}

export default function SearchButton({onClick, className} : SearchButtonProps) {
    return (
        <div
            onClick={onClick}
            className={`hover:border-ring flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-500 transition-all duration-150 select-none hover:border-gray-300 hover:ring-3 hover:ring-gray-200 md:w-100 ${className}`}
        >
            <div className="flex items-center gap-2">
                <Search size={18} />
                <span>Tìm kiếm sản phẩm</span>
            </div>

            <span>⌘K</span>
        </div>
    );
}
