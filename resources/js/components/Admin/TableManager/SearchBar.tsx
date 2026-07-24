import { Search, CircleX } from "lucide-react"

interface SearchBarProps {
    onSearch: (e:React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    querySearch: string;
    loadingSearch: boolean;
    resultCount: number;

}

export default function SearchBar({ onSearch, onClear, querySearch, loadingSearch, resultCount }: SearchBarProps) {
    return (
        <div className="py-1 px-2 h-8.5 border border-gray-200 flex justify-between items-center rounded-lg w-full md:w-100 gap-1 focus-within:ring-3 focus-within:ring-blue-600/30 focus-within:border-blue-600 transition-colors duration-150 bg-gray-100/50">
            <div className="flex gap-2 items-center flex-1">
                <Search size={18} className="text-gray-400" />
                <input onChange={onSearch} value={querySearch} type="text" name="search" id="search" placeholder="Tìm kiếm theo tên, email, số điện thoại..." className="w-full focus:outline-0" />
            </div>
            {querySearch && !loadingSearch && (

                <div className="flex gap-2 items-center">
                    <span className="text-xs font-medium">({resultCount} kết quả)</span>
                    <CircleX onClick={onClear} size={18} className="text-gray-500 hover:text-red-600 transition-colors duration-150 cursor-pointer" />
                </div>

            )}
            {loadingSearch && (
                <div className="w-4 h-4 border-2 border-gray-500 rounded-full border-t-transparent animate-spin shrink-0"></div>
            )}
        </div>
    )
}