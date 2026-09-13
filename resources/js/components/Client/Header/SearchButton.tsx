import { Search } from "lucide-react";

interface SearchButtonProps{
    onClick : () => void; 
}

export default function SearchButton({onClick} : SearchButtonProps) {
    return (
        <div
            onClick={onClick}
            className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-gray-500 select-none hover:border-ring hover:ring-3 hover:ring-gray-200 hover:border-gray-300  md:w-100 transition-all duration-150 text-xs font-medium"
        >
            <div className="flex gap-2 items-center">
                <Search size={18} />
                <span>Tìm kiếm sản phẩm</span>
            </div>

            <span>⌘K</span>
        </div>
    );
}
