import { Search, CircleX } from 'lucide-react';

interface SearchBarProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    querySearch: string;
    loadingSearch: boolean;
    resultCount: number;
    placeHolder: string;
}

export default function SearchBar({ onSearch, onClear, querySearch, loadingSearch, resultCount, placeHolder }: SearchBarProps) {

    return (
        <div className="flex h-8.5 w-full items-center justify-between gap-1 rounded-lg border border-gray-300 px-2 py-1 md:w-100">
            <div className="flex flex-1 items-center gap-2">
                <Search size={18} className="text-gray-400" />
                <input
                    onChange={onSearch}
                    value={querySearch}
                    type="text"
                    name="search"
                    id="search"
                    placeholder={placeHolder}
                    className="w-full focus:outline-0"
                />
            </div>

            {querySearch && !loadingSearch && (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
                        ({resultCount} kết quả)
                    </span>
                    <CircleX onClick={onClear} size={18} strokeWidth={1.5} className="cursor-pointer text-gray-500 transition-colors duration-150"/>
                </div>
            )}

            {loadingSearch && (
                <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
            )}
        </div>
    );
}
